<template>
  <div class="w-full h-[60px] bg-yellow-100 flex justify-between items-center px-5">
    <img
      class="h-[30px] cursor-pointer"
      draggable="false"
      src="/logo.png"
    >
    <div class="w-max flex gap-4">
      <router-link
        v-for="(menu, index) in menus"
        :key="index"
        class="block w-max h-max rounded-full px-5 py-1 font-semibold select-none cursor-pointer hover:underline"
        :class="{ 'bg-black/10': menu.name.includes(route.name) }"
        :to="menu.path"
      >
        {{ menu.display }}
      </router-link>
    </div>
    <div class="w-max h-max">
      <div class="w-[150px] h-max flex justify-end">
        <img
          class="w-[35px] h-[35px] rounded-full cursor-pointer"
          draggable="false"
          src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const menus = [
    {
      name: ['board', 'board-detail'],
      path: '/board',
      display: 'Board'
    },
    {
      name: ['chart', 'chart-detail'],
      path: '/chart',
      display: 'Grafik'
    },
    {
      name: ['employee'],
      path: '/employee',
      display: 'Karyawan'
    }
  ]
</script>