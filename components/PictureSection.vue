<script setup>
const { data: pictures, pending, refresh } = await useMyFetch('/images')
</script>

<template>
  <div v-if="pending">LOADING...</div>
  <div
    v-else
    class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6"
  >
    <div v-for="picture in pictures" :key="picture._id" class="px-2 py-4 bg-slate-100 rounded-xl w-full">
      <NuxtLink :to="`/image/` + picture._id">
        <div class="pl-4 font-semibold">
          {{ picture.name }}
        </div>
        <div class="mt-3 overflow-hidden max-h-40 rounded-md">
          <img :src="picture.url" :alt="picture.name" class="rounded-md"/>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
