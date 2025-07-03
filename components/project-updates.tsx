import Image from "next/image"

interface ProjectUpdatesProps {
  projectId: string
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  // This would normally be fetched from an API
  const updates = [
    {
      id: "1",
      date: "2023-05-15",
      title: "Prototype Pertama Selesai!",
      content: `
        <p>Halo para pendukung EcoBag!</p>
        <p>Kami dengan bangga mengumumkan bahwa prototype pertama EcoBag telah selesai! Setelah beberapa minggu eksperimen dengan berbagai jenis limbah tekstil, kami akhirnya menemukan kombinasi material yang tepat yang memberikan kekuatan dan estetika yang kami inginkan.</p>
        <p>Berikut adalah beberapa foto prototype yang telah kami buat:</p>
      `,
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    },
    {
      id: "2",
      date: "2023-04-28",
      title: "Kerjasama dengan Pabrik Tekstil Lokal",
      content: `
        <p>Kabar gembira!</p>
        <p>Kami baru saja menandatangani kesepakatan dengan PT Tekstil Nusantara untuk mendapatkan akses ke limbah tekstil mereka secara regular. Ini adalah langkah besar karena menjamin pasokan bahan baku kami dan membantu mengurangi limbah yang berakhir di tempat pembuangan sampah.</p>
        <p>Terima kasih atas dukungan kalian yang membuat ini semua mungkin!</p>
      `,
      images: [],
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

  return (
    <div className="space-y-8">
      {updates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Belum ada update untuk proyek ini.</p>
      ) : (
        updates.map((update) => (
          <div key={update.id} className="border-b pb-8">
            <div className="mb-2 text-sm text-gray-500">{formatDate(update.date)}</div>
            <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: update.content }} />

            {update.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {update.images.map((image, index) => (
                  <div key={index} className="relative h-40">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Update image ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
