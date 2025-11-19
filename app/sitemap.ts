import { MetadataRoute } from 'next'
import { getMountains } from '@/lib/mountains'

export default function sitemap(): MetadataRoute.Sitemap {
  const mountains = getMountains()
  const baseUrl = 'https://worldsummits.com'

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/comparator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Mountain detail pages
  const mountainRoutes = mountains.map((mountain) => ({
    url: `${baseUrl}/mountains/${mountain.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Expedition simulator pages
  const expeditionRoutes = mountains.map((mountain) => ({
    url: `${baseUrl}/expedition/${mountain.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...mountainRoutes, ...expeditionRoutes]
}
