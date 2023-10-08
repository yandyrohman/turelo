<template>
  <div class="w-[600px] h-max bg-white rounded-md shadow-md px-5 pt-3 pb-5">
    <div class="text-center font-semibold select-none mb-3 text-xl">Grafik Harian</div>
    <div class="w-full h-max pr-3">
      <Bar
        id="my-chart-id"
        :options="state.chartOptions"
        :data="state.chartData"
      />
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const state = reactive({
    chartData: {
      labels: [ 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6','Day 7' ],
      datasets: [
        {
          data: [40, 20, 12],
          backgroundColor: ['#0099f2']
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
          text: 'Poin yang diselesaikan',
          position: 'left'
        }
      }
    }
  })
</script>