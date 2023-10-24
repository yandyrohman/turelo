<template>
  <div class="w-full h-full">
    <board-header />
    <div class="w-full h-[calc(100%-130px)] flex px-[50px] space-x-10 overflow-x-auto">
      <board-kanban
        name="Backlog"
        status="backlog"
        :hover-kanban="onHoverKanban"
        :drag-card="dragCard"
        @drag="handleDrag"
        @release="handleRelease"
      />
      <board-kanban
        name="Dalam Pengerjaan"
        status="inprogress"
        :hover-kanban="onHoverKanban"
        :drag-card="dragCard"
        @drag="handleDrag"
        @release="handleRelease"
      />
       <board-kanban
        name="Testing"
        status="testing"
        :hover-kanban="onHoverKanban"
        :drag-card="dragCard"
        @drag="handleDrag"
        @release="handleRelease"
      />
      <board-kanban
        name="Selesai"
        status="done"
        :hover-kanban="onHoverKanban"
        :drag-card="dragCard"
        @drag="handleDrag"
        @release="handleRelease"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import boardHeader from '../components/board/header.vue'
  import boardKanban from '../components/board/kanban.vue'

  const onDrag = ref(false)
  const onHoverKanban = ref(null)

  const dragCard = ref({})

  function handleDrag (card) {
    dragCard.value = card

    const cardElement = document.getElementById(`card-${card.id}`)

    const kanbanBacklogElement = document.getElementById('kanban-backlog')
    const kanbanInprogressElement = document.getElementById('kanban-inprogress')
    const kanbanTestingElement = document.getElementById('kanban-testing')
    const kanbanDoneElement = document.getElementById('kanban-done')


    const isOnBacklog = isElementCollide(cardElement, kanbanBacklogElement)
    const isOnInprogress = isElementCollide(cardElement, kanbanInprogressElement)
    const isOnTesting = isElementCollide(cardElement, kanbanTestingElement)
    const isOnDone = isElementCollide(cardElement, kanbanDoneElement)

    if (isOnBacklog) onHoverKanban.value = 'backlog'
    else if (isOnInprogress) onHoverKanban.value = 'inprogress'
    else if (isOnTesting) onHoverKanban.value = 'testing'
    else if (isOnDone) onHoverKanban.value = 'done'
    else onHoverKanban.value = null

    onDrag.value = true
  }

  function handleRelease () {
    onDrag.value = false
  }

  function isElementCollide (el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth
    
    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
  }
</script>