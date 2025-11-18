import { getMountainById, getMountains } from "@/lib/mountains"
import { ExpeditionSimulator } from "@/components/expedition-simulator"
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

export default async function ExpeditionPage({ params }: PageProps) {
  const { id } = await params
  const mountain = getMountainById(id)

  if (!mountain) {
    notFound()
  }

  return <ExpeditionSimulator mountain={mountain} />
}
