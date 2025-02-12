<template>
    <div class="container mx-auto px-4 py-8" v-if="post">
      <article>
        <h1 class="text-4xl font-bold mb-4">{{ post.Title }}</h1>
        <img 
          v-if="post.mainImage" 
          :src="urlFor(post.mainImage)"
          class="w-full max-h-96 object-cover mb-8"
        />
        <div class="prose prose-lg max-w-none">
          <SanityContent :blocks="post.body" />
        </div>
      </article>
    </div>
  </template>
  
  <script setup>
  const { $sanity } = useNuxtApp()
  const route = useRoute()
  
  const post = ref(null)
  
  onMounted(async () => {
    const query = `*[_type == "post" && slug == $slug][0]{
      Title,
      body,
      mainImage,
      publishedAt
    }`
    
    post.value = await $sanity.fetch(query, {
      slug: route.params.slug
    })
  })
  
  const urlFor = (source) => {
    return $sanity.image(source).url()
  }
  </script>