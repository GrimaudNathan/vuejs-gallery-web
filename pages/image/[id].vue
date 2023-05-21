<script setup>
const route = useRoute()
const { data: pictures } = await useMyFetch('/images')
</script>

<template>
  <div class="mt-16 mr-2 mb-2 p-6 bg-white rounded-2xl w-full">
    <h1 class="text-2xl">{{ pictures.find((picture) => picture._id === route.params.id).name }}</h1>
    <img
      :src="`http://localhost:3000/images/` + route.params.id"
      alt="picture"
      class="mt-10 h-1/2 w-auto rounded-xl"
    />
  </div>
</template>
