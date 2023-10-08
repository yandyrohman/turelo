<template>
  <div class="w-full h-full">
    <chart-header />
    <div class="w-full flex justify-center gap-7 px-[65px] pt-10">
      <chart-daily />
      <chart-burndown/>
    </div>
  </div>
</template>

<script setup>
  import chartHeader from '../components/chart/header.vue'
  import chartDaily from '../components/chart/daily.vue'
  import chartBurndown from '../components/chart/burndown.vue'
</script>