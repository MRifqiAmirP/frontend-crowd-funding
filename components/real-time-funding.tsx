"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Users, Clock, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/midtrans"

interface FundingData {
  projectId: string
  currentFunding: number
  targetFunding: number
  backers: number
  donations: Array<{
    id: string
    amount: number
    donorName: string
    createdAt: string
    rewardId?: string
  }>
  lastUpdated: string
}

interface RealTimeFundingProps {
  projectId: string
  initialData?: FundingData
  showRecentDonations?: boolean
  compact?: boolean
}

export default function RealTimeFunding({
  projectId,
  initialData,
  showRecentDonations = true,
  compact = false,
}: RealTimeFundingProps) {
  const [fundingData, setFundingData] = useState<FundingData | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)
  const [lastAmount, setLastAmount] = useState(0)

  const fetchFundingData = async () => {
    try {
      const response = await fetch(`/api/funding/${projectId}`)
      if (response.ok) {
        const data = await response.json()

        // Check if funding amount increased (new donation)
        if (fundingData && data.currentFunding > fundingData.currentFunding) {
          setLastAmount(fundingData.currentFunding)
        }

        setFundingData(data)
      }
    } catch (error) {
      console.error("Error fetching funding data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFundingData()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchFundingData, 30000)

    return () => clearInterval(interval)
  }, [projectId])

  if (isLoading || !fundingData) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  const percentFunded = Math.min((fundingData.currentFunding / fundingData.targetFunding) * 100, 100)
  const isNewDonation = lastAmount > 0 && fundingData.currentFunding > lastAmount

  return (
    <div className={`space-y-${compact ? "3" : "4"}`}>
      {/* Main Funding Display */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <motion.div
              key={fundingData.currentFunding}
              initial={isNewDonation ? { scale: 1.1, color: "#10b981" } : false}
              animate={{ scale: 1, color: "#000000" }}
              transition={{ duration: 0.5 }}
              className={`${compact ? "text-lg" : "text-2xl"} font-bold`}
            >
              {formatCurrency(fundingData.currentFunding)}
            </motion.div>
            <p className={`${compact ? "text-xs" : "text-sm"} text-gray-600`}>
              terkumpul dari {formatCurrency(fundingData.targetFunding)}
            </p>
          </div>
          <div className="text-right">
            <div className={`${compact ? "text-lg" : "text-xl"} font-semibold text-blue-600`}>
              {percentFunded.toFixed(1)}%
            </div>
            <p className={`${compact ? "text-xs" : "text-sm"} text-gray-500`}>tercapai</p>
          </div>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentFunded}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Progress value={percentFunded} className={`${compact ? "h-2" : "h-3"}`} />
          {isNewDonation && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            >
              +{formatCurrency(fundingData.currentFunding - lastAmount)}
            </motion.div>
          )}
        </motion.div>

        {!compact && (
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{fundingData.backers} pendukung</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Target: {formatCurrency(fundingData.targetFunding)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Donations */}
      {showRecentDonations && fundingData.donations.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <h4 className="font-medium text-sm">Dukungan Terbaru</h4>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {fundingData.donations.slice(0, 5).map((donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{donation.donorName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{formatCurrency(donation.amount)}</p>
                    {donation.rewardId && (
                      <Badge variant="outline" className="text-xs">
                        Reward #{donation.rewardId}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        <span>Update terakhir: {new Date(fundingData.lastUpdated).toLocaleTimeString("id-ID")}</span>
      </div>
    </div>
  )
}
