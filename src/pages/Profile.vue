<template>
  <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Profile Anda</div>
  <div class="w-full flex justify-center">
    <div class="w-[500px] h-max bg-white rounded-md shadow-md p-10">
      <div class="w-full flex flex-col justify-center items-center mb-10">
        <img
          class="w-[60px] h-[60px] rounded-full object-cover mb-5"
          draggable="false"
          :src="profile.picture"
        >
        <div class="text-xl font-bold">
          {{ profile.name }}
        </div>
        <div>{{ profile.email }}</div>
      </div>
      <div class="w-full flex mb-7">
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Jabatan</div>
          <div class="text-center">{{ profile.position }}</div>
        </div>
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Gaji</div>
          <div class="text-center">Rp {{ formatNumber(profile.salary) }}</div>
        </div>
      </div>
      <div class="w-full flex">
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Status</div>
          <div class="text-center">
            <template v-if="profile.status === 'permanent'">Karyawan Tetap</template>
            <template v-if="profile.status === 'contract'">Karyawan Kontrak</template>
            <template v-if="profile.status === 'apprentice'">Karyawan Magang</template>
          </div>
        </div>
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Role System</div>
          <div v-if="profile.role === 'admin'" class="text-center">Admin</div>
          <div v-if="profile.role === 'user'" class="text-center">User</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const profile = JSON.parse(localStorage.getItem('user'))

  function formatNumber (x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } else {
      return x
    }
  }
</script>