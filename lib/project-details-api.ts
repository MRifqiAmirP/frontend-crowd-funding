// lib/project-details-api.ts
import apiClient from "@/lib/apiClient";

// Define the structure of a single support package as returned by the API
export interface SupportPackage {
    id: string;
    packageName: string;
    nominal: number;
    benefit: string;
}

// Define the structure of a category within the project details
export interface ProjectCategory {
    projectId: string;
    categoryId: string;
    category: {
        id: string;
        category_name: string;
    };
}

// Define the structure of a gallery item from the API
export interface GalleryItem {
    id: string;
    title: string;
    caption: string;
    imageUrl: string;
}

// Define the structure of the raw project data for a single project from your API
export interface RawProjectDetailData {
    id: string;
    userId: string;
    projectName: string;
    provider: string;
    educationLevel: string;
    institutionName: string;
    shortDescription: string;
    fullDescription: string;
    aboutProject: string;
    target: number;
    deadline: string; // ISO string
    thumbnailUrl: string;
    createdAt: string;
    categories: ProjectCategory[];
    galleries: GalleryItem[]; // Using the new GalleryItem interface
    supportPackages: SupportPackage[]; // Array of support packages
    videoUrl?: string; // Added videoUrl as optional, as it might not always be present
    // Add any other raw fields if they exist in your API response
}

interface ProjectDetailsApiResponse {
    success: boolean;
    message?: string;
    data: RawProjectDetailData; // The API returns a single project object under a 'data' key
}

// Define the structure of the project details as expected by the frontend components
export interface ProjectDetails {
    id: string;
    title: string; // Mapped from projectName
    description: string; // Mapped from shortDescription
    image: string; // Mapped from thumbnailUrl
    category: string; // Will be the name of the first category
    school: string; // Mapped from institutionName
    currentFunding: number; // Placeholder, as not in API response
    targetFunding: number;
    deadline: string;
    daysLeft: number; // Calculated from deadline
    backers: number; // Placeholder, as not in API response
    videoUrl?: string; // Added videoUrl to ProjectDetails
    fullDescription: string; // Added fullDescription to ProjectDetails
    aboutProject: string; // Added aboutProject to ProjectDetails
    galleries: GalleryItem[]; // Added galleries to ProjectDetails
    provider: string; // Added provider to ProjectDetails
    institutionName: string; // Added institutionName to ProjectDetails
    rewards: Array<{
        id: string;
        amount: number; // Mapped from nominal
        title: string; // Mapped from packageName
        description: string; // Mapped from benefit
        estimatedDelivery?: string; // Not in API, can be added if needed
        limited?: boolean; // Not in API, can be added if needed
        remaining?: number; // Not in API, can be added if needed
        available?: boolean;
    }>;
}

/**
 * Calculates the number of days left until a given deadline.
 * @param deadlineDateString The deadline date string (e.g., "2025-12-31T00:00:00.000Z").
 * @returns The number of days left, or 0 if the deadline is in the past.
 */
const calculateDaysLeft = (deadlineDateString: string): number => {
    const deadline = new Date(deadlineDateString);
    const now = new Date();
    // Set time to 00:00:00 for accurate day calculation
    deadline.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays); // Ensure daysLeft is not negative
};


/**
 * Fetches details for a single project from the backend API.
 * @param projectId The ID of the project to fetch.
 * @returns A promise that resolves with a ProjectDetails object.
 * @throws An error if the API call fails.
 */
export const getProjectDetails = async (projectId: string): Promise<ProjectDetails> => {
    try {
        const response = await apiClient.get<ProjectDetailsApiResponse>(`/api/projects/${projectId}`);

        if (response.data.success) {
            const rawProject = response.data.data;

            // Transform supportPackages to match the DonationFormProps rewards structure
            const transformedRewards = rawProject.supportPackages.map(sp => ({
                id: sp.id,
                amount: sp.nominal,
                title: sp.packageName,
                description: sp.benefit,
                estimatedDelivery: "TBD", // Placeholder, as not in API response
                limited: false, // Placeholder, as not in API response
                available: true, // Assuming all fetched rewards are available by default
            }));

            // Transform the raw API data into the ProjectDetails interface expected by the frontend
            const transformedProject: ProjectDetails = {
                id: rawProject.id,
                title: rawProject.projectName,
                description: rawProject.shortDescription,
                image: rawProject.thumbnailUrl || "/placeholder.svg",
                category: rawProject.categories.length > 0 ? rawProject.categories[0].category.category_name : "Uncategorized",
                school: rawProject.institutionName, // Mapped from institutionName
                currentFunding: 0, // Placeholder, as not in API response
                targetFunding: rawProject.target,
                deadline: rawProject.deadline,
                daysLeft: calculateDaysLeft(rawProject.deadline),
                backers: 0, // Placeholder, as not in API response
                rewards: transformedRewards,
                videoUrl: rawProject.videoUrl, // Mapped from rawProject.videoUrl
                fullDescription: rawProject.fullDescription, // Mapped from rawProject.fullDescription
                aboutProject: rawProject.aboutProject, // Mapped from rawProject.aboutProject
                galleries: rawProject.galleries, // Mapped directly
                provider: rawProject.provider, // Mapped from rawProject.provider
                institutionName: rawProject.institutionName, // Mapped from rawProject.institutionName
            };

            return transformedProject;
        } else {
            throw new Error(response.data.message || 'Failed to fetch project details.');
        }
    } catch (error: any) {
        console.error(`Error fetching project details for ID ${projectId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch project details.');
    }
};
