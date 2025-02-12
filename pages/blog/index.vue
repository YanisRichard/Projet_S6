<template>
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Articles</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="post in posts" :key="post.slug" class="border rounded-lg p-4">
          <img v-if="post.mainImage" :src="urlFor(post.mainImage)" class="w-full h-48 object-cover mb-4" />
          <h2 class="text-xl font-semibold mb-2">{{ post.Title }}</h2>
          <p class="text-gray-600 mb-4">
            {{ new Date(post.publishedAt).toLocaleDateString() }}
          </p>
          <NuxtLink :to="`/blog/${post.slug}`" class="text-blue-500 hover:underline">
            Lire la suite
          </NuxtLink>
        </article>
      </div>
    </div>
  </template>
  
  <script setup>
const { fetchPosts } = useSanity()
const posts = ref([])

onMounted(async () => {
  posts.value = await fetchPosts()
})
</script>