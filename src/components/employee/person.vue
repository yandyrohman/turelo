<template>
  <div class="w-full bg-white flex px-5 select-none items-center py-4 border-b hover:bg-zinc-50">
    <div class="shrink-0 w-[25%] flex gap-4 pr-3 items-center">
      <img
        class="shrink-0 w-[40px] h-[40px] rounded-full"
        draggable="false"
        src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
      >
      <div class="w-full">
        <div class="w-full font-semibold line-clamp-1 break-all">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quibusdam delectus ea asperiores incidunt quis possimus temporibus vero, amet natus aspernatur reiciendis, maxime dignissimos dolor quia, illo laboriosam architecto dolorem?
          <!-- Yandi Rohman -->
        </div>
        <div class="text-sm text-zinc-500 line-clamp-1 break-all">
          yandy.rhm@gmail.com
          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque consectetur labore quia recusandae eaque. Sequi corrupti vitae, perspiciatis laudantium, natus ut rerum optio nobis dolorem necessitatibus dolore incidunt eligendi sed. -->
        </div>
      </div>
    </div>
    <div class="shrink-0 w-[16.25%]">
      Frontend Dev
    </div>
    <div class="shrink-0 w-[16.25%]">
      Rp 100.000.000
    </div>
    <div class="shrink-0 w-[16.25%]">
      Karyawan Tetap
    </div>
    <div class="shrink-0 w-[16.25%]">
      Admin
    </div>
    <div class="shrink-0 w-[10%] flex gap-4">
      <div class="w-[40px] h-[30px] flex justify-center items-center hover:bg-zinc-200 rounded-md cursor-pointer">
        <icon icon="tabler:edit" class="text-xl text-zinc-500" />
      </div>
      <div class="w-[40px] h-[30px] flex justify-center items-center hover:bg-zinc-200 rounded-md cursor-pointer">
        <icon icon="tabler:trash" class="text-xl text-zinc-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>