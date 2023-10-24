<template>
  <div class="w-full h-full">
    <board-header />
    <div class="w-full h-[calc(100%-130px)] flex px-[50px] space-x-10 overflow-x-auto">
      <board-kanban
        name="Backlog"
        status="backlog"
      />
      <board-kanban
        name="Dalam Pengerjaan"
        status="inprogress"
      />
       <!-- <board-kanban
        name="Testing"
        :cards="[]"
      />
      <board-kanban
        name="Selesai"
        :cards="[]"
      /> -->
    </div>
  </div>
</template>

<script setup>
  import boardHeader from '../components/board/header.vue'
  import boardKanban from '../components/board/kanban.vue'
</script>