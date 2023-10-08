<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Semua Board</div>
    <div class="w-full flex justify-center">
      <div class="w-[1000px] h-max grid grid-cols-3 gap-[40px]">
        <div
          v-for="i in 8"
          class="relative w-full h-[180px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer select-none"
        >
          <img
            class="absolute w-full h-full object-cover top-0 left-0"
            draggable="false"
            src="https://images.unsplash.com/photo-1696587522065-7ea3e7ac033f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
          <div class="absolute w-full h-full top-0 left-0 z-10 p-3 flex flex-col justify-between">
            <div class="w-max max-w-full px-3 py-1 bg-white/50 rounded-[10px] select-none">
              <span class="line-clamp-2 font-semibold break-all">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi assumenda repudiandae quisquam sunt laboriosam veritatis voluptatem quod? Enim, libero. Perspiciatis ratione sit, sapiente magni temporibus officiis veniam quaerat nulla voluptas.
              </span>
            </div>
            <div class="w-max flex px-3 py-1 bg-white/50 rounded-[10px] space-x-[-10px] select-none">
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
          </div>
        </div>
        <div class="w-full h-[180px] rounded-lg transition-all bg-black/5 border-2 border-dashed border-zinc-400 select-none cursor-pointer hover:bg-black/10 flex justify-center items-center">
          <icon icon="tabler:plus" class="text-[40px] text-zinc-500" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>