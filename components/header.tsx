"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "@/components/ui/use-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari akun",
    });
    router.push("/");
  };

  // Update navItems - menggabungkan Incubator dan Komunitas menjadi satu
  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Jelajahi Proyek", href: "/projects" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Incubator", href: "/incubator" },
    { name: "Cara Kerja", href: "/how-it-works" },
    { name: "Blog", href: "/blog" },
    { name: "Tentang Kami", href: "/about" },
  ];

  // Check if current path is incubator related
  const isIncubatorPath = pathname.startsWith("/incubator");

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    switch (user.role) {
      case "student":
        return "/dashboard/student";
      case "mentor":
        return "/dashboard/mentor";
      case "donor":
        return "/dashboard/donor";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center space-x-2"
              >
                {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PS</span>
                </div> */}
                <span className="hidden sm:block">ProyekSiswa.id</span>
                {/* <span className="sm:hidden">PS</span> */}
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/incubator"
                  ? isIncubatorPath
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group px-3 py-2 rounded-md"
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth/User Section */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-3">
                <MotionButton variant="outline" size="sm" asChild>
                  <Link href={getDashboardLink()}>Dashboard</Link>
                </MotionButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            user.avatar ||
                            `https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`
                          }
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Pengaturan
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <MotionButton variant="outline" size="sm" asChild>
                  <Link href="/login">Masuk</Link>
                </MotionButton>
                <MotionButton size="sm" asChild>
                  <Link href="/register">Daftar</Link>
                </MotionButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/incubator"
                      ? isIncubatorPath
                      : pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <MotionButton className="w-full justify-center" asChild>
                        <Link
                          href={getDashboardLink()}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </MotionButton>
                      <MotionButton
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        Logout
                      </MotionButton>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <MotionButton
                      variant="outline"
                      className="w-full justify-center"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Masuk
                      </Link>
                    </MotionButton>
                    <MotionButton className="w-full justify-center" asChild>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Daftar
                      </Link>
                    </MotionButton>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
