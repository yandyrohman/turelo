<template>
  <div class="w-[600px] h-max bg-white rounded-md shadow-md px-5 pt-3 pb-5">
    <div class="text-center font-semibold select-none mb-3 text-xl">Grafik Burndown</div>
    <div class="w-full h-max pr-3">
      <Line
        id="my-chart-id"
        :options="state.chartOptions"
        :data="state.chartData"
      />
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

  const state = reactive({
    chartData: {
      labels: [ 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6','Day 7' ],
      datasets: [
        {
          data: [60, 50, 40, 30, 20, 10, 0],
          pointRadius: 0
        },
        {
          data: [60, 40, 24, 10, 10, 5, 0],
          borderColor: ['#0099f2'],
          pointRadius: 5
        }
      ]
    },
    chartOptions: {
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
  })
</script>