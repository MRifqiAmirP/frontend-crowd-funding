"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  FileText,
  MessageSquare,
  Share2,
  Bookmark,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getResearchById } from "@/lib/research-data";
import { notFound } from "next/navigation";

export default function ResearchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const research = getResearchById(params.id);

  if (!research) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "active":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/incubator">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {research.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge>{research.category}</Badge>
                <Badge className={getStatusColor(research.stage)}>
                  {research.stage}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="sm" asChild>
                <Link href={`/incubator/research/${research.id}/fund`}>
                  Danai Riset
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={research.images[0] || "/placeholder.svg"}
                  alt={research.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{research.rating}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{research.views} views</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{research.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="team">Tim</TabsTrigger>
                <TabsTrigger value="updates">Update</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi Riset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {research.description}
                    </p>

                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-3">
                        Detail Lengkap
                      </h3>
                      <div className="whitespace-pre-line text-gray-700">
                        {research.fullDescription}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {research.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Dokumen</h3>
                      <div className="space-y-3">
                        {research.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="font-medium">{doc.title}</p>
                                <p className="text-sm text-gray-500">
                                  {doc.type} • {doc.size}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Milestone & Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {research.milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                milestone.status === "completed"
                                  ? "bg-green-100"
                                  : milestone.status === "active"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              {getStatusIcon(milestone.status)}
                            </div>
                            {index < research.milestones.length - 1 && (
                              <div className="w-px h-12 bg-gray-200 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">
                                {milestone.title}
                              </h3>
                              <Badge
                                className={getStatusColor(milestone.status)}
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {milestone.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>Target: {milestone.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tim Peneliti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {research.team.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 border rounded-lg"
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {member.name}
                            </h3>
                            <p className="text-purple-600 font-medium">
                              {member.role}
                            </p>
                            <p className="text-gray-600">{member.expertise}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Kontak
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-6">
                  {research.updates.map((update) => (
                    <Card key={update.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                research.researcher.avatar || "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>{update.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{update.title}</h3>
                              <span className="text-sm text-gray-500">
                                • {update.date}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">
                              {update.content}
                            </p>
                            {update.images.length > 0 && (
                              <div className="grid grid-cols-2 gap-4">
                                {update.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image || "/placeholder.svg"}
                                    alt="Update image"
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Diskusi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Kolaborasi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Laporan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Progress Pendanaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Terkumpul</span>
                      <span className="font-medium">
                        {Math.round(
                          (research.funding / research.targetFunding) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(research.funding / research.targetFunding) * 100}
                      className="h-3"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      Rp {(research.funding / 1000000).toFixed(1)}M
                    </span>
                    <span className="text-gray-600">
                      dari Rp {(research.targetFunding / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{research.backers} pendana</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{research.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/incubator/research/${research.id}/fund`}>
                      Danai Sekarang
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Researcher Info */}
            <Card>
              <CardHeader>
                <CardTitle>Peneliti Utama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={research.researcher.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {research.researcher.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {research.researcher.name}
                    </h3>
                    <p className="text-purple-600">
                      {research.researcher.role}
                    </p>
                    <p className="text-sm text-gray-600">
                      {research.researcher.institution}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Reputasi</span>
                    <span className="font-medium">
                      {research.researcher.reputation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Publikasi</span>
                    <span className="font-medium">
                      {research.researcher.publications}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengalaman</span>
                    <span className="font-medium">
                      {research.researcher.experience}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Kontak
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Funders */}
            <Card>
              <CardHeader>
                <CardTitle>Pendana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {research.funders.map((funder, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={funder.logo || "/placeholder.svg"} />
                        <AvatarFallback>{funder.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{funder.name}</p>
                        <p className="text-xs text-gray-600">{funder.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          Rp {(funder.amount / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
