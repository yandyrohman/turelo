<template>
  <navigation />
  <div class="w-full h-[calc(100dvh-60px)] bg-zinc-300 overflow-y-auto">
    <router-view />
  </div>
</template>

<script setup>
  import navigation from '../components/navigation.vue'
</script>