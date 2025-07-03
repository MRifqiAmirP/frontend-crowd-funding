"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function ProjectFilters() {
  const [fundingRange, setFundingRange] = useState([0])

  const categories = [
    "Teknologi",
    "Edukasi",
    "Lingkungan",
    "Kesehatan",
    "Sosial",
    "Agrikultur",
    "Seni & Budaya",
    "E-Commerce",
  ]

  const educationLevels = ["SMP", "SMA/SMK", "Perguruan Tinggi"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category}`} />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Jenjang Pendidikan</h3>
        <div className="space-y-2">
          {educationLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={`level-${level}`} />
              <Label htmlFor={`level-${level}`}>{level}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Status Pendanaan</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all">Semua</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ongoing" id="status-ongoing" />
            <Label htmlFor="status-ongoing">Sedang Berlangsung</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="almost" id="status-almost" />
            <Label htmlFor="status-almost">Hampir Selesai</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="funded" id="status-funded" />
            <Label htmlFor="status-funded">Terdanai Penuh</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Target Pendanaan</h3>
        <div className="space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} onValueChange={setFundingRange} />
          <div className="flex justify-between text-sm">
            <span>Rp0</span>
            <span>Rp{fundingRange[0]}jt</span>
            <span>Rp100jt+</span>
          </div>
        </div>
      </div>

      <Button className="w-full">Terapkan Filter</Button>
    </div>
  )
}
