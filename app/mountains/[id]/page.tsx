import { getMountainById, getMountains } from "@/lib/mountains"
import { MountainDetailClient } from "@/components/mountain-detail-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const mountains = getMountains()
  return mountains.map((mountain) => ({
    id: mountain.id,
  }))
}

export default async function MountainDetailPage({ params }: PageProps) {
  const { id } = await params
  const mountain = getMountainById(id)

  if (!mountain) {
    notFound()
  }

  return <MountainDetailClient mountain={mountain} />
}
