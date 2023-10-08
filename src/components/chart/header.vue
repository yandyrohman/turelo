<template>
  <div class="w-full h-[110px] flex justify-between px-[50px] pt-[20px]">
    <div class="w-max">
      <router-link
        class="w-max flex items-center gap-2 select-none cursor-pointer hover:bg-black/10 transition-all px-3 py-1 rounded-full"
        to="/chart"
      >
        <icon icon="tabler:arrow-left" class="text-xl" />
        <div class="max-w-[450px] line-clamp-1 break-all font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque iusto provident qui laborum, libero temporibus ipsum facilis voluptatum explicabo consequuntur accusantium ut natus officia tempora? Harum placeat ullam aut expedita?
        </div>
      </router-link>
      <div class="text-sm text-zinc-600 select-none ml-[40px]">25 Total Card</div>
    </div>
    <div class="w-max">
      <div class="text-sm text-zinc-600 select-none mb-3">Semua Anggota</div>
      <div class="flex items-center gap-2">
        <div class="w-max flex rounded-[10px] space-x-[-10px] select-none">
          <img
            v-for="i in 4"
            draggable="false"
            class="w-[30px] h-[30px] object-cover rounded-full"
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
          >
          <div class="w-[30px] h-[30px] rounded-full bg-white border-dashed flex justify-center items-center text-sm font-semibold text-zinc-400 select-none">
            9+
          </div>
        </div>
        <div class="text-sm underline select-none cursor-pointer font-semibold">Lihat Semua</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>