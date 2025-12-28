import { MetadataRoute } from 'next'
import { METADATA } from './constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: METADATA.website,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
