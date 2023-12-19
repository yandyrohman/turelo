<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Semua Grafik</div>
    <div class="w-full flex justify-center">
      <div class="w-[1000px] h-max grid grid-cols-3 gap-[40px]">
        <router-link
          v-for="chart in state.charts"
          class="relative w-full h-[180px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer select-none flex flex-col justify-between"
          :to="'/app/chart/' + chart.id"
        >
          <div class="font-semibold text-lg leading-tight py-3 px-5">
            <span class="line-clamp-2 break-all">
              {{ chart.name }}
            </span>
          </div>
          <div class="w-full pb-5">
            <div class="w-full flex justify-between px-5 mb-1">
              <span class="text-zinc-500 text-sm">Progress</span>
              <span class="text-zinc-500 text-sm">{{ chart.progress }}%</span>
            </div>
            <div class="w-full px-5 mb-5">
              <div class="relative w-full h-[10px] bg-zinc-100 rounded-full">
                <div
                  class="absolute h-full bg-green-500 top-0 left-0 rounded-full"
                  :style="styleBoardProgress(chart)"
                />
              </div>
            </div>
            <div class="w-max flex px-5 py-1 rounded-[10px] space-x-[-10px] select-none">
              <img
                v-for="member in chart.members.slice(0, 4)"
                draggable="false"
                class="w-[30px] h-[30px] object-cover rounded-full"
                :src="member.picture"
              >
              <div
                v-if="chart.members.length > 4"
                class="w-[30px] h-[30px] rounded-full bg-zinc-100 border-dashed flex justify-center items-center text-sm font-semibold text-zinc-400 select-none"
              >
                {{ chart.members.length - 4 }}+
              </div>
              <div v-if="chart.members.length === 0">
                Belum ada anggota
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import { getChart } from '../services/chart'

  const state = reactive({
    charts: []
  })

  async function handleGetChart () {
    const { data } = await getChart()
    state.charts = data
  }

  function styleBoardProgress (chart) {
    return `width: ${chart.progress}%`
  }

  onMounted(() => {
    handleGetChart()
  })

</script>