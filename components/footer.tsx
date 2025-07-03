import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PS</span>
              </div>
              <h3 className="text-xl font-bold">ProyekSiswa.id</h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Platform crowdfunding pendidikan pertama di Indonesia yang didedikasikan untuk mendukung proyek riset dan penelitian pelajar/mahasiswa.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>proyeksiswaa@gmail.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+62 898 3064 613</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Palembang, Indonesia</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                // { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/proyeksiswa.id/", label: "Instagram" },
                // { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "https://www.youtube.com/@proyeksiswaid", label: "YouTube" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Jelajahi</h3>
            <ul className="space-y-3">
              {[
                { name: "Semua Proyek", href: "/projects" },
                { name: "Kategori", href: "/projects/categories" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Incubator", href: "/projects/incubator" },
                { name: "Blog & Edukasi", href: "/blog" },
                { name: "Tentang Kami", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-3">
              {[
                { name: "Tentang Kami", href: "/about" },
                { name: "Cara Kerja", href: "/how-it-works" },
                { name: "FAQ", href: "/faq" },
                { name: "Hubungi Kami", href: "/contact" },
                // { name: "Karir", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-3">
              {[
                { name: "Syarat & Ketentuan", href: "/terms" },
                { name: "Kebijakan Privasi", href: "/privacy" },
                { name: "Pusat Bantuan", href: "/help" },
                // { name: "Jadi Mentor", href: "/mentorship" },
                // { name: "Keamanan", href: "/security" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} ProyekSiswa.id. Hak Cipta Dilindungi.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="privacy" className="text-gray-400 hover:text-white transition-colors">
                Privasi & Cookies
              </Link>
              {/* <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
