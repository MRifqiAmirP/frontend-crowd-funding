"use client"

import { motion } from "framer-motion"
import { CheckCircle2, LightbulbIcon, PiggyBank, Users } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: LightbulbIcon,
      title: "Buat Proyekmu",
      description: "Daftarkan ide bisnismu dengan detail yang menarik dan target pendanaan yang jelas",
    },
    {
      icon: Users,
      title: "Dapatkan Dukungan",
      description: "Bagikan proyekmu dan kumpulkan dukungan dari komunitas dan mentor",
    },
    {
      icon: PiggyBank,
      title: "Kumpulkan Dana",
      description: "Terima pendanaan dari para pendukung yang tertarik dengan idemu",
    },
    {
      icon: CheckCircle2,
      title: "Wujudkan Ide",
      description: "Gunakan dana dan bimbingan untuk merealisasikan ide bisnismu",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {steps.map((step, index) => (
        <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4"
            >
              <step.icon className="h-10 w-10 text-blue-600" />
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -z-10 transform -translate-x-10"
              />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
