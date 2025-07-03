import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { MotionProvider } from "@/components/motion-provider"
import SplashProvider from "@/components/splash-provider"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProyekSiswa.id - Platform Crowdfunding Riset dan Penelitian Pelajar",
  description:
    "Platform crowdfunding pendidikan pertama di Indonesia yang didedikasikan untuk mendukung proyek riset dan penelitian pelajar/mahasiswa.",
  generator: "DeveloperProyekSiswa.id",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <SplashProvider>
            <MotionProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pt-0">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </MotionProvider>
          </SplashProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
