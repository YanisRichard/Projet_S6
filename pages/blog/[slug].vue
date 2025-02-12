<script setup>
const route = useRoute()
const { $sanity } = useNuxtApp()

const query = `*[_type == "post" && slug.current == $slug][0] {
  title,
  body,
  mainImage{
    asset->{url}
  },
  publishedAt
}`

const post = ref(null)

onMounted(async () => {
  post.value = await $sanity.fetch(query, { slug: route.params.slug })
})
</script>

<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <img v-if="post.mainImage" :src="post.mainImage.asset.url" alt="Post image" />
    <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
    <div v-html="post.body"></div>
  </div>
</template>
