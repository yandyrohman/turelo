<template>
  <div class="w-[600px] h-max bg-white rounded-md shadow-md px-5 pt-3 pb-5">
    <div class="text-center font-semibold select-none mb-3 text-xl">Grafik Burndown</div>
    <div class="w-full h-max pr-3">
      <Line
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script setup>
  import { reactive, defineProps, computed } from 'vue'
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

  const props = defineProps({
    totalPoint: {
      type: Number,
      default: 0
    },
    logs: {
      type: Array,
      default: () => ([])
    }
  })

  const chartData = computed(() => {
    const labels = props.logs.map(log => log.date)
    const burndownDatas = props.logs.map((log, index) => {
      let remainingPoint = props.totalPoint
      let position = (index + 1)
      for (let i = 0; i < position; i++) {
        remainingPoint -= props.logs[i].point
      }
      return remainingPoint
    })
    
    return {
      labels,
      datasets: [
        {
          data: burndownDatas,
          borderColor: ['#0099f2'],
          pointRadius: 5
        }
      ]
    }
  })

  const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Poin yang tersisa',
          position: 'left'
        }
      }
    }
</script>