"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  DollarSign,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function IncubatorNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/incubator/dashboard",
      icon: Home,
      description: "Overview dan statistik",
    },
    {
      name: "Riset",
      href: "/incubator",
      icon: BookOpen,
      description: "Jelajahi riset aktif",
      exactMatch: true, // Only match exact path
    },
    {
      name: "Komunitas",
      href: "/incubator/community",
      icon: MessageSquare,
      description: "Diskusi dan kolaborasi",
      badge: "12",
    },
    {
      name: "Pendana",
      href: "/incubator/funders",
      icon: DollarSign,
      description: "Database investor",
    },
    {
      name: "Acara",
      href: "/incubator/events",
      icon: Calendar,
      description: "Event dan webinar",
    },
    {
      name: "Analytics",
      href: "/incubator/analytics",
      icon: TrendingUp,
      description: "Laporan dan insights",
    },
  ];

  // Function to determine if nav item is active
  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exactMatch) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  // Only show this nav on incubator pages
  if (!pathname.startsWith("/incubator")) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 ">
          {/* Navigation Links */}
          <div className="flex items-center space-x-1 scrollbar-hide">
            {navItems.map((item) => {
              const active = isActive(item);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex-shrink-0"
                >
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                      active
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant={active ? "secondary" : "outline"}
                        className={`ml-1 text-xs ${
                          active ? "bg-white/20 text-white border-white/30" : ""
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>

                  {/* Active indicator for mobile */}
                  {active && (
                    <motion.div
                      layoutId="incubator-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 sm:hidden"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="relative">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Indicator */}
      <div className="sm:hidden">
        <div className="flex justify-center space-x-1 pb-2">
          {navItems.map((item) => (
            <div
              key={item.href}
              className={`w-2 h-2 rounded-full transition-colors ${
                isActive(item) ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
