<script setup>

var name = ''
var file = null
const router = useRouter();

function onPhotoChange(event) {
  file = event.target.files[0]
}

async function uploadPhoto(event) {
  event.preventDefault()

  const formData = new FormData()
  formData.append('name', name)
  formData.append('file', file)
  await useMyFetch('/images', {
    method: 'POST',
    body: formData,
  })
  router.push({ path: "/" });
}
</script>

<template>
  <div class="mt-16 mr-2 mb-2 p-6 bg-white rounded-2xl w-full">
    <h1 class="text-2xl">Ajouter une photo</h1>
    <form @submit="uploadPhoto" enctype="multipart/form-data" class="mt-10 space-y-5">
      <div>
        <input
          type="text"
          id="name"
          v-model="name"
          class="border-2 border-slate-400 rounded-md py-2 px-4"
          placeholder="Nom"
          required
        />
      </div>
      <div>
        <input
          type="file"
          id="file"
          @change="onPhotoChange"
          class="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
          required
        />
      </div>
      <button
        type="submit"
        class="py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>
