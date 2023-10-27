<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Semua Grafik</div>
    <div class="w-full flex justify-center">
      <div class="w-[1000px] h-max grid grid-cols-3 gap-[40px]">
        <router-link
          v-for="i in 12"
          class="relative w-full h-[180px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer select-none flex flex-col justify-between"
          to="/app/chart/abc"
        >
          <div class="font-semibold text-lg leading-tight py-3 px-5">
            <span class="line-clamp-2 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, maiores. Quis, iure repellat nisi quae quod nesciunt quas velit illo sequi architecto odit earum vel doloribus cupiditate, debitis in aliquid?
            </span>
          </div>
          <div class="w-full pb-5">
            <div class="w-full flex justify-between px-5 mb-1">
              <span class="text-zinc-500 text-sm">Progress</span>
              <span class="text-zinc-500 text-sm">45%</span>
            </div>
            <div class="w-full px-5 mb-5">
              <div class="relative w-full h-[10px] bg-zinc-100 rounded-full">
                <div class="absolute w-[45%] h-full bg-green-500 top-0 left-0 rounded-full"></div>
              </div>
            </div>
            <div class="w-max flex rounded-[10px] space-x-[-10px] select-none mx-5">
              <img
                v-for="i in 4"
                draggable="false"
                class="w-[30px] h-[30px] object-cover rounded-full"
                src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
              >
              <div class="w-[30px] h-[30px] rounded-full bg-zinc-100 border-dashed flex justify-center items-center text-sm font-semibold text-zinc-400 select-none">
                9+
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>