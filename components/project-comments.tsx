"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface ProjectCommentsProps {
  projectId: string
}

export default function ProjectComments({ projectId }: ProjectCommentsProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This would normally be fetched from an API
  const comments = [
    {
      id: "1",
      user: {
        name: "Budi Santoso",
        image: "/placeholder.svg?height=100&width=100",
      },
      date: "2023-05-10",
      content:
        "Proyek yang sangat inspiratif! Saya sangat mendukung inisiatif ramah lingkungan seperti ini. Semoga bisa mencapai target pendanaan secepatnya.",
    },
    {
      id: "2",
      user: {
        name: "Anisa Rahma",
        image: "/placeholder.svg?height=100&width=100",
      },
      date: "2023-05-08",
      content:
        "Saya tertarik dengan konsep daur ulang limbah tekstil ini. Apakah kalian juga menerima donasi berupa kain bekas? Saya punya beberapa yang mungkin bisa dimanfaatkan.",
    },
    {
      id: "3",
      user: {
        name: "Darmawan",
        image: "/placeholder.svg?height=100&width=100",
      },
      date: "2023-05-05",
      content:
        "Sebagai guru kewirausahaan, saya sangat mengapresiasi proyek ini. Ini adalah contoh nyata bagaimana pelajar bisa berkontribusi pada lingkungan sekaligus belajar tentang bisnis. Sukses terus!",
    },
  ]

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast({
        title: "Komentar tidak boleh kosong",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Komentar berhasil ditambahkan",
        description: "Terima kasih atas partisipasi Anda.",
      })
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder="Tulis komentar atau pertanyaan Anda..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-2"
          rows={4}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Belum ada komentar untuk proyek ini.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={comment.user.image || "/placeholder.svg"}
                    alt={comment.user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.user.name}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
