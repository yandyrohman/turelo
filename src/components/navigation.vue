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
      <div class="relative w-[150px] h-max flex justify-end">
        <div
          class="w-[35px] h-[35px]"
          @click.stop="handleToggleMenu(true)"
        >
          <img
            class="w-[35px] h-[35px] rounded-full cursor-pointer"
            draggable="false"
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
          >
          <div
            v-if="state.showMenu"
            class="absolute w-max h-max top-[40px] right-0 bg-white rounded-md shadow-xl py-2"
          >
            <router-link
              class="block px-5 py-2 hover:bg-zinc-100 select-none cursor-pointer font-semibold"
              to="/profile"
            >
              Profile
            </router-link>
            <div
              class="px-5 py-2 hover:bg-zinc-100 select-none cursor-pointer font-semibold"
              @click="handleLogout"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const state = reactive({
    showMenu: false
  })

  const menus = [
    {
      name: ['board', 'board-detail'],
      path: '/app/board',
      display: 'Board'
    },
    {
      name: ['chart', 'chart-detail'],
      path: '/app/chart',
      display: 'Grafik'
    },
    {
      name: ['employee'],
      path: '/app/employee',
      display: 'Karyawan'
    }
  ]

  function handleToggleMenu (toggle) {
    state.showMenu = toggle
  }

  function handleLogout () {
    localStorage.removeItem('user')
    router.push('/')
  }

  onMounted(() => {
    document.addEventListener('click', () => handleToggleMenu(false))
  })
</script>