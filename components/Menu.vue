<template>
  <div>
    <menu class="p-4 bg-slate-100 space-y-5 w-[260px] h-screen">
      <div>
        <NuxtLink to="/" class="flex items-center space-x-2">
          <IconNuxt class="h-8 w-auto" />
          <div class="text-xl">DrivePic</div>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="add-picture">
          <AddButton />
        </NuxtLink>
      </div>
    </menu>
  </div>
</template>
