<template>
  <div class="w-full h-full">
    <chart-header />
    <div class="w-full flex justify-center gap-7 px-[65px] pt-10">
      <chart-daily :logs="logs" />
      <chart-burndown
        :total-point="totalPoint"
        :logs="logs"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getChartDetail } from '../services/chart'

  import chartHeader from '../components/chart/header.vue'
  import chartDaily from '../components/chart/daily.vue'
  import chartBurndown from '../components/chart/burndown.vue'

  const route = useRoute()

  const totalPoint = ref(0)
  const logs = ref([])

  async function handleGetDetail () {
    const boardId = route.params.id
    const { data } = await getChartDetail(boardId)
    totalPoint.value = data.totalPoint
    logs.value = data.logs
  }

  onMounted(() => {
    handleGetDetail()
  })
</script>