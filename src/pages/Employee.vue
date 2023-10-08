<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">List Karyawan</div>
    <div class="w-full flex justify-center">
      <div class="w-[1100px] h-max">
        <div class="w-full h-max rounded-md overflow-hidden shadow-md">
          <div class="w-full flex py-3 bg-zinc-200 select-none px-5">
            <div class="w-[25%] text-zinc-500">Nama Karyawan</div>
            <div class="w-[16.25%] text-zinc-500">Jabatan</div>
            <div class="w-[16.25%] text-zinc-500">Gaji</div>
            <div class="w-[16.25%] text-zinc-500">Status</div>
            <div class="w-[26.25%] text-zinc-500">Role System</div>
          </div>
          <person-employee v-for="i in 5" />
        </div>
        <div class="flex justify-center mt-8">
          <pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import pagination from '../components/pagination.vue'
  import personEmployee from '../components/employee/person.vue'
</script>