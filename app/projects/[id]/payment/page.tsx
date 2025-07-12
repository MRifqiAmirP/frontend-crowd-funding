"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"; // Added Loader2 and AlertCircle
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import DonationFormEnhanced from "@/components/payment/donation-form-enhanced";
import EscrowSystem from "@/components/payment/escrow-system";
import RealTimeFunding from "@/components/real-time-funding";
// import { featuredProjects } from "@/lib/dummy-data"; // Removed as we will fetch data from API
import { getProjectDetails, ProjectDetails } from "@/lib/project-details-api"; // Import the API function and ProjectDetails type
import { Alert, AlertDescription } from "@/components/ui/alert"; // Import Alert and AlertDescription

export default function ProjectPaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const [project, setProject] = useState<ProjectDetails | null>(null); // State to store fetched project details
  const [isLoading, setIsLoading] = useState(true); // Loading state for project details
  const [error, setError] = useState<string | null>(null); // Error state for project details

  // Fetch project details on component mount or when params.id changes
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProject = await getProjectDetails(params.id);
        setProject(fetchedProject);
      } catch (err: any) {
        setError(err.message || "Failed to load project details.");
        console.error("Failed to fetch project details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]); // Dependency array includes params.id to refetch if ID changes

  // Handle loading state
  if (isLoading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">Memuat detail proyek...</p>
        </div>
      </PageTransition>
    );
  }

  // Handle error state
  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 max-w-md mx-auto">
          <Alert className="mb-6 text-center border-red-200 bg-red-50">
            <AlertCircle className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <AlertDescription className="text-red-800 text-base font-medium">
              {error}
            </AlertDescription>
            <p className="text-sm text-gray-700 mt-2">
              Silakan coba muat ulang halaman atau kembali ke{" "}
              <Link href="/projects" className="text-blue-600 hover:underline">
                halaman proyek
              </Link>
            </p>
          </Alert>
        </div>
      </PageTransition>
    );
  }

  // Handle project not found (if API returns null or empty data)
  if (!project) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Proyek Tidak Ditemukan</h2>
          <p className="text-gray-600">
            Maaf, proyek yang Anda cari tidak ditemukan. Silakan kembali ke{" "}
            <Link href="/projects" className="text-blue-600 hover:underline">
              halaman proyek
            </Link>
          </p>
        </div>
      </PageTransition>
    );
  }

  // Get pre-selected amount and reward from URL params (still using searchParams if needed)
  const preSelectedAmount = searchParams.get("amount");
  const preSelectedReward = searchParams.get("reward");

  // Removed the hardcoded 'rewards' array as DonationFormEnhanced now fetches its own
  // const rewards = [...];

  const handlePaymentSuccess = (orderId: string) => {
    // Redirect to success page with project info
    console.log(
      `Payment successful for order ${orderId} on project ${project.title}`
    );

    // window.location.href = `/payment/success?order_id=${orderId}&project_id=${project.id}`;
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Proyek
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DonationFormEnhanced
              projectId={project.id}
              projectTitle={project.title}
              // The 'rewards' prop is no longer passed here as DonationFormEnhanced fetches them internally
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Real-time Funding Display */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Progress Pendanaan</h3>
              <RealTimeFunding
                projectId={project.id}
                showRecentDonations={true}
                compact={false}
              />
            </div>

            {/* Escrow System */}
            <EscrowSystem
              projectId={project.id}
              targetAmount={project.targetFunding}
              currentAmount={project.currentFunding} // This will be 0 until your API provides it
              deadline={project.deadline} // Pass the deadline string directly from the fetched project
              status="active" // Assuming status is always active for now
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
