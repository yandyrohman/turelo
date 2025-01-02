<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-100">
    <div class="w-max h-max flex flex-col items-center gap-10">
      <img
        class="h-[30px]"
        draggable="false"
        src="/logo.png"
      >
      <div class="w-[400px] h-max bg-white rounded-lg shadow-lg p-5 space-y-5">
        <div class="w-full">
          <div class="w-full text-zinc-500 select-none text-[14px] mb-1">
            Email
          </div>
          <input
            v-model="form.email"
            class="block w-full h-[40px] border rounded-md px-5"
            placeholder="Masukan Email"
            @keypress="handleEnter"
          >
        </div>
        <div class="w-full">
          <div class="w-full text-zinc-500 select-none text-[14px] mb-1">
            Password
          </div>
          <input
            v-model="form.password"
            class="block w-full h-[40px] border rounded-md px-5"
            placeholder="Masukan Password"
            type="password"
            @keypress="handleEnter"
          >
        </div>
        <div
          v-if="showError"
          class="text-red-500"
        >
          Email atau password salah!
        </div>
        <div class="w-full pt-5">
          <button
            class="w-full h-[45px] bg-yellow-500 rounded-md text-white font-semibold cursor-pointer hover:bg-yellow-600 transition-all"
            @click="handleLogin"
          >
            {{ showLoading ? 'Loading..' : 'Masuk' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '../services/user'

  const router = useRouter()

  const form = reactive({
    email: '',
    password: ''
  })

  const showError = ref(false)
  const showLoading = ref(false)

  async function handleLogin () {
    showError.value = false
    showLoading.value = true
    
    const { data: loginResult } = await login({
      email: form.email,
      password: form.password
    })
    if (loginResult.success) {
      localStorage.setItem('user', JSON.stringify(loginResult.user))

      if (loginResult.user.role === 'manager') {
        router.push('/app/chart')
      } else {
        router.push('/app/board')
      }
    } else {
      showError.value = true
    }

    showLoading.value = false
  }

  function handleEnter (event) {
    if (event.keyCode === 13) handleLogin()
  }
</script>