import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const useSanity = () => {
  const config = useRuntimeConfig()
  
  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: 'v2023-01-01',
    useCdn: false,
  })

  const builder = imageUrlBuilder(client)

  const fetchPosts = async () => {
    try {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        Title,
        slug,
        mainImage,
        publishedAt
      }`
      return await client.fetch(query)
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error)
      return []
    }
  }

  const urlFor = (source) => {
    return builder.image(source)
  }

  return {
    client,
    fetchPosts,
    urlFor
  }
}