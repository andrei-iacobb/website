import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// No lastModified: new Date() would claim every page changed on every
// build, which teaches crawlers to distrust the dates entirely.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/homelab`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
