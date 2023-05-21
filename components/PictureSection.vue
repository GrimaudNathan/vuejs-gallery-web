<script setup>
const { data: pictures, pending, refresh } = await useMyFetch('/images')
</script>

<template>
  <div v-if="pending">LOADING...</div>
  <div
    v-else
    class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6"
  >
    <div v-for="picture in pictures" :key="picture._id" class="px-2 py-4 bg-slate-100 rounded-xl">
      <NuxtLink :to="`/image/` + picture._id">
        <div class="pl-4 font-semibold">
          {{ picture.name }}
        </div>
        <div class="mt-3 rounded-md overflow-hidden max-h-40">
          <img :src="picture.url" :alt="picture.name" />
        </div>
      </NuxtLink>
    </div>
  </div>
  <div>
    <button
      @click="refresh"
      class="mt-4 py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
    >
      Rafraichir
    </button>
  </div>
</template>
