<script setup>
const { $sanity } = useNuxtApp()

const query = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  mainImage{
    asset->{url}
  },
  publishedAt
}`

const posts = ref([])

onMounted(async () => {
  posts.value = await $sanity.fetch(query)
})
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug.current">
        <NuxtLink :to="`/blog/${post.slug.current}`">
          <img v-if="post.mainImage" :src="post.mainImage.asset.url" alt="Post image" />
          <h2>{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
