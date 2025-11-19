interface StructuredDataProps {
  type: 'mountain' | 'expedition' | 'comparator' | 'breadcrumb'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd = {}

  switch (type) {
    case 'mountain':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Mountain',
        name: data.name,
        description: data.description,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.coordinates.lat,
          longitude: data.coordinates.lng,
          elevation: data.stats.altitude
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: data.country
        },
        image: data.image,
        url: `https://worldsummits.com/mountains/${data.id}`
      }
      break

    case 'expedition':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: `${data.name} Expedition`,
        description: `Plan your expedition to ${data.name}`,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.coordinates.lat,
          longitude: data.coordinates.lng,
          elevation: data.stats.altitude
        },
        touristType: 'Mountaineer',
        url: `https://worldsummits.com/expedition/${data.id}`
      }
      break

    case 'comparator':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Mountain Comparator',
        applicationCategory: 'Utility',
        description: 'Compare mountains side by side',
        url: 'https://worldsummits.com/comparator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
      break

    case 'breadcrumb':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
