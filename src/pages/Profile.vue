<template>
  <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Profile Anda</div>
  <div class="w-full flex justify-center">
    <div class="w-[500px] h-max bg-white rounded-md shadow-md p-10">
      <div class="w-full flex flex-col justify-center items-center mb-10">
        <img
          class="w-[60px] h-[60px] rounded-full object-cover mb-5"
          draggable="false"
          src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
        >
        <div class="text-xl font-bold">Yandi Rohman</div>
        <div>yandy.rhm@gmail.com</div>
      </div>
      <div class="w-full flex mb-7">
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Jabatan</div>
          <div class="text-center">CEO Perusahaan</div>
        </div>
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Gaji</div>
          <div class="text-center">Rp 100.000.000</div>
        </div>
      </div>
      <div class="w-full flex">
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Status</div>
          <div class="text-center">Karyawan Tetap</div>
        </div>
        <div class="w-1/2">
          <div class="text-zinc-500 text-sm text-center">Role System</div>
          <div class="text-center">Admin</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>