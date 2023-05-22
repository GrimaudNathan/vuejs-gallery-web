<script setup>
const route = useRoute()
const router = useRouter()
var name = ''
var height = 0
var width = 0
const filter = ref('')
const { data: pictures, refresh } = await useMyFetch('/images')

async function deletePicture() {
  await useMyFetch(`/images/${route.params.id}`, {
    method: 'DELETE',
  })
  router.push({ path: '/' })
}

async function changePicture(event) {
  event.preventDefault()

  await useMyFetch(`/images/${route.params.id}`, {
    method: 'PUT',
    body: { name },
  })
  refresh()
}

function downloadPicture() {
  const link = document.createElement('a')
  link.href = `http://localhost:3000/images/${route.params.id}`
  link.download = route.params.id
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function sendResizedPicture(event) {
  event.preventDefault()
  const { data: img } = await useMyFetch(`/images/${route.params.id}`)
  const file = await resizeImage(img.value, width, height)
  const formData = new FormData()
  formData.append('file', file)
  await useMyFetch(`/images/${route.params.id}`, {
    method: 'PUT',
    body: formData,
  })
  router.go(0)
}
async function sendFilterPicture(event) {
  event.preventDefault()
  const { data: img } = await useMyFetch(`/images/${route.params.id}`)
  const file = await applyFilter(img.value, filter.value)
  const formData = new FormData()
  formData.append('file', file)
  await useMyFetch(`/images/${route.params.id}`, {
    method: 'PUT',
    body: formData,
  })
  router.go(0)
}
</script>

<template>
  <div class="mt-16 mr-2 mb-2 p-6 bg-white rounded-2xl w-full">
    <h1 class="text-2xl">{{ pictures.find((picture) => picture._id === route.params.id).name }}</h1>
    <div class="mt-10 xl:flex xl:space-x-10">
      <div>
        <img
          :src="`http://localhost:3000/images/` + route.params.id"
          alt="picture"
          class="max-h-[600px] w-auto rounded-xl"
        />
        <div class="mt-4 flex space-x-6">
          <button
            class="py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
            @click="downloadPicture"
            download
          >
            Telecharger
          </button>
          <button
            @click="deletePicture"
            class="py-2 px-4 bg-red-100 text-red-500 rounded-md shadow-md hover:bg-red-200 transition"
          >
            Effacer
          </button>
        </div>
      </div>
      <div class="mt-4">
        <form @submit="changePicture" enctype="multipart/form-data">
          <input
            type="text"
            id="name"
            v-model="name"
            class="border-2 border-slate-400 rounded-md py-2 px-4 mr-2"
            placeholder="Nom"
            required
          />
          <button
            type="submit"
            class="py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
          >
            Changer le nom
          </button>
        </form>
        <form @submit="sendResizedPicture" enctype="multipart/form-data" class="flex mt-4">
          <input
            type="number"
            id="height"
            v-model="height"
            class="w-32 border-2 border-slate-400 rounded-md py-2 px-4 mr-2"
            placeholder="Hauteur"
          />
          <input
            type="number"
            id="width"
            v-model="width"
            class="w-32 border-2 border-slate-400 rounded-md py-2 px-4 mr-2"
            placeholder="Largeur"
          />
          <button
            type="submit"
            class="py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
          >
            Redimensionner
          </button>
        </form>
        <form
          @submit="sendFilterPicture"
          enctype="multipart/form-data"
          class="mt-4 flex items-center space-x-4"
        >
          <div>
            <input
              type="radio"
              id="grayscale"
              value="grayscale"
              v-model="filter"
              class="accent-slate-500 mr-1"
            />
            <label for="grayscale">Noir et blanc</label>
          </div>

          <div>
            <input
              type="radio"
              id="sepia"
              value="sepia"
              v-model="filter"
              class="accent-slate-500 mr-1"
            />
            <label for="sepia">Sépia</label>
          </div>
          <button
            type="submit"
            class="py-2 px-4 bg-slate-100 rounded-md shadow-md hover:bg-slate-200 transition"
          >
            Appliquer le filtre
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
