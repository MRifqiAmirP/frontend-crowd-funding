"use client"

import type React from "react"
import { useState } from "react"

interface DonationFormProps {
  projectId: string
}

const DonationForm: React.FC<DonationFormProps> = ({ projectId }) => {
  const [amount, setAmount] = useState<number | null>(null)
  const [selectedReward, setSelectedReward] = useState<string | null>(null)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setAmount(isNaN(value) ? null : value)
  }

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReward(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || amount < 10000) {
      alert("Minimum donasi adalah Rp 10.000")
      return
    }

    // Redirect to payment page with amount and reward info
    const params = new URLSearchParams({
      amount: amount.toString(),
      reward: selectedReward || "custom",
    })

    window.location.href = `/projects/${projectId}/payment?${params.toString()}`
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Jumlah Donasi (Rp):</label>
        <input
          type="number"
          id="amount"
          value={amount === null ? "" : amount.toString()}
          onChange={handleAmountChange}
          placeholder="Masukkan jumlah donasi"
        />
      </div>

      <div>
        <p>Pilih Reward:</p>
        <div>
          <input type="radio" id="reward1" name="reward" value="reward1" onChange={handleRewardChange} />
          <label htmlFor="reward1">Reward 1</label>
        </div>
        <div>
          <input type="radio" id="reward2" name="reward" value="reward2" onChange={handleRewardChange} />
          <label htmlFor="reward2">Reward 2</label>
        </div>
        <div>
          <input type="radio" id="custom" name="reward" value="custom" onChange={handleRewardChange} defaultChecked />
          <label htmlFor="custom">Tanpa Reward (Donasi Langsung)</label>
        </div>
      </div>

      <button type="submit">Donasi Sekarang</button>
    </form>
  )
}

export default DonationForm
