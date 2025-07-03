"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Users, Calendar, BookOpen, TrendingUp, Award, Plus, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CommunitySidebar() {
  const pathname = usePathname()

  const communityNavItems = [
    {
      name: "Beranda",
      href: "/incubator/community",
      icon: MessageSquare,
      count: null,
    },
    {
      name: "Diskusi Populer",
      href: "/incubator/community/trending",
      icon: TrendingUp,
      count: "24",
    },
    {
      name: "Acara",
      href: "/incubator/community/events",
      icon: Calendar,
      count: "5",
    },
    {
      name: "Sumber Daya",
      href: "/incubator/community/resources",
      icon: BookOpen,
      count: null,
    },
    {
      name: "Leaderboard",
      href: "/incubator/community/leaderboard",
      icon: Award,
      count: null,
    },
  ]

  const popularChannels = [
    { name: "ai-research", members: 245, active: true },
    { name: "biotech", members: 189, active: false },
    { name: "renewable-energy", members: 156, active: true },
    { name: "funding-tips", members: 298, active: false },
    { name: "collaboration", members: 167, active: true },
  ]

  const onlineMembers = [
    {
      name: "Dr. Sarah Wijaya",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      status: "online",
    },
    {
      name: "Prof. Ahmad Fauzi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "online",
    },
    {
      name: "Dr. Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "away",
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Komunitas</h2>
          <Button size="sm" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-purple-50 rounded-lg p-2">
            <p className="text-lg font-bold text-purple-600">2.4K</p>
            <p className="text-xs text-gray-600">Anggota</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-lg font-bold text-blue-600">156</p>
            <p className="text-xs text-gray-600">Online</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-1">
          {communityNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-gray-900"
                  }`}
                  size="sm"
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.count && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Popular Channels */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Channel Populer</h3>
        <div className="space-y-1">
          {popularChannels.map((channel) => (
            <Link key={channel.name} href={`/incubator/community/channel/${channel.name}`}>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                size="sm"
              >
                <Hash className="h-3 w-3 mr-2" />
                <span className="flex-1 text-left text-sm">{channel.name}</span>
                <div className="flex items-center gap-1">
                  {channel.active && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  <span className="text-xs text-gray-500">{channel.members}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Online Members */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Online Sekarang</h3>
        <div className="space-y-2">
          {onlineMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
              </div>
              <span className="text-sm text-gray-700 truncate">{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Plus className="h-3 w-3 mr-2" />
                Buat Diskusi
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Calendar className="h-3 w-3 mr-2" />
                Buat Event
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Users className="h-3 w-3 mr-2" />
                Invite Member
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
