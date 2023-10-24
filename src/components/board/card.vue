<template>
  <div
    :id="id"
    class="bg-white p-5 rounded-md shadow-md border border-zinc-100 select-none cursor-pointer space-y-2 hover:bg-zinc-50"
    :class="{ 'fixed': cardMove }"
    :style="cardDynamicMove"
    @mousedown="handleDragStart"
    @mousemove="handleDragMove"
    @mouseup="handleDragEnd"
  >
    <div class="w-max h-max bg-black/10 rounded-full font-semibold text-sm text-zinc-500 select-none px-2">
      {{ props.card.point }} Poin
    </div>
    <div class="w-full line-clamp-2 font-semibold text-xl leading-tight py-1">
      {{ props.card.title }}
    </div>
    <div class="text-sm text-zinc-500 line-clamp-4">
      {{ props.card.description }}
    </div>
    <div class="w-max flex gap-1 pt-2">
      <img
        v-for="i in 6"
        class="w-[30px] h-[30px] rounded-full"
        draggable="false"
        src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
      >
      <div class="w-[30px] h-[30px] rounded-full bg-zinc-100 flex justify-center items-center hover:bg-zinc-200">
        <icon icon="tabler:dots" class="text-zinc-500" />
      </div>
      <div class="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-zinc-200 border-2 border-dashed">
        <icon icon="tabler:user-plus" class="text-zinc-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, defineProps } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    card: {
      type: Object,
      default: () => ({})
    }
  })

  const cardX = ref(0)
  const cardY = ref(0)

  const cardWidth = ref(0)
  const cardHeight = ref(0)

  const cardMove = ref(false)

  const id = computed(() => {
    return `card-${props.card.id}`
  })

  const cardDynamicMove = computed(() => {
    if (cardWidth.value && cardHeight.value) {
      return `left: ${cardX.value}px; top: ${cardY.value}px; width: ${cardWidth.value}px; height: ${cardHeight.value}px;`
    } else {
      return `left: ${cardX.value}px; top: ${cardY.value}px;`
    }
  })

  function handleDragStart (event) {
    const card = document.getElementById(id.value)
    const cardStyle = getComputedStyle(card)
    const cardWidthRaw = Number(cardStyle.width.replace('px', ''))
    const cardHeightRaw = Number(cardStyle.height.replace('px', ''))

    cardMove.value = true

    cardWidth.value = cardWidthRaw
    cardHeight.value = cardHeightRaw

    cardX.value = event.pageX - (cardWidthRaw / 2)
    cardY.value = event.pageY - (cardHeightRaw / 2)

  }

  function handleDragEnd () {
    cardMove.value = false
  }

  function handleDragMove (event) {
    if (cardMove.value) {
      const card = document.getElementById(id.value)
      const cardStyle = getComputedStyle(card)
      const cardWidthRaw = Number(cardStyle.width.replace('px', ''))
      const cardHeightRaw = Number(cardStyle.height.replace('px', ''))

      cardX.value = event.pageX - (cardWidthRaw / 2)
      cardY.value = event.pageY - (cardHeightRaw / 2)
    }
  }
</script>