<template>
  <div class="w-[600px] h-max bg-white rounded-md shadow-md px-5 pt-3 pb-5">
    <div class="text-center font-semibold select-none mb-3 text-xl">Grafik Harian</div>
    <div class="w-full h-max pr-3">
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, defineProps } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const props = defineProps({
    logs: {
      type: Array,
      default: () => ([])
    }
  })

  const chartData = computed(() => {
    const labels = props.logs.map(log => log.date)
    const burndownDatas = props.logs.map(log => log.point)
    return {
      labels,
      datasets: [
        {
          data: burndownDatas,
          backgroundColor: ['#0099f2']
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
        text: 'Poin yang diselesaikan',
        position: 'left'
      }
    }
  }
</script>