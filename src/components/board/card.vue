<template>
  <div
    :id="id"
    class="bg-white p-5 rounded-md shadow-md border border-zinc-100 select-none cursor-pointer space-y-2 hover:bg-zinc-50"
    :class="{ 'fixed': cardMove }"
    :style="cardDynamicMove"
    @mousedown="handleDragStart"
    @mousemove="handleDragMove"
    @mouseup="handleDragEnd"
    @mouseover="() => cardHover = true"
    @mouseleave="() => cardHover = false"
  >
    <div class="w-full flex items-center justify-between">
      <div class="w-max h-max bg-black/10 rounded-full font-semibold text-sm text-zinc-500 select-none px-2">
        {{ props.card.point }} Poin
      </div>
      <div
        v-if="cardHover"
        class="w-[30px] h-[30px] flex justify-center items-center bg-zinc-200 rounded-md hover:bg-zinc-300"
        @mousedown.stop
        @click.stop="handleShowDetail"
      >
        <icon icon="tabler:circle-arrow-up-right-filled" class="text-2xl text-zinc-600" />
      </div>
    </div>
    <div class="w-full line-clamp-2 font-semibold text-xl leading-tight py-1">
      {{ props.card.title }}
    </div>
    <div class="text-sm text-zinc-500 line-clamp-4">
      {{ props.card.description }}
    </div>
    <div class="w-max flex gap-1 pt-2">
      <div
        v-if="!isAssigned()"
        class="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-zinc-200 border-2 border-dashed"
        @mousedown.stop
        @click.stop="handleAssignToMe"
      >
        <icon icon="tabler:user-plus" class="text-zinc-500" />
      </div>
      <div
        v-if="isAssigned()"
        class="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-red-100 hover:bg-red-200 border border-red-300"
        @mousedown.stop
        @click.stop="handleAssignToMe"
      >
        <icon icon="tabler:user-minus" class="text-red-500" />
      </div>
      <img
        v-for="assign in assigns"
        :key="assign.id"
        class="w-[30px] h-[30px] rounded-full"
        draggable="false"
        :src="assign.picture"
      >
      <div
        v-if="props.card.assigns.length > 4"
        class="w-[30px] h-[30px] rounded-full bg-zinc-100 flex justify-center items-center hover:bg-zinc-200"
        @mousedown.stop
        @click.stop
      >
        <icon icon="tabler:dots" class="text-zinc-500" />
      </div>
    </div>
  </div>
  <teleport to="body">
    <card-detail
      v-model:show="cardDetailShow"
      :card="cardSelected"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </teleport>
</template>

<script setup>
  import { computed, ref, defineProps, defineEmits } from 'vue'
  import { Icon } from '@iconify/vue'

  import cardDetail from './card-detail.vue'

  const props = defineProps({
    card: {
      type: Object,
      default: () => ({})
    }
  })

  const assigns = computed(() => {
    const length = props.card.assigns.length
    if (length > 4) {
      return props.card.assigns.slice(0, 4)
    } else {
      return props.card.assigns
    }
  })

  const cardX = ref(0)
  const cardY = ref(0)

  const cardWidth = ref(0)
  const cardHeight = ref(0)

  const cardMove = ref(false)
  const cardHover = ref(false)
  const cardDetailShow = ref(false)

  const cardSelected = ref({})

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

  const emit = defineEmits(['drag', 'release', 'edit', 'delete', 'assign'])

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
    emit('release')
  }

  function handleShowDetail () {
    cardSelected.value = props.card
    cardDetailShow.value = true
  }

  function handleDragMove (event) {
    if (cardMove.value) {
      const card = document.getElementById(id.value)
      const cardStyle = getComputedStyle(card)
      const cardWidthRaw = Number(cardStyle.width.replace('px', ''))
      const cardHeightRaw = Number(cardStyle.height.replace('px', ''))

      cardX.value = event.pageX - (cardWidthRaw / 2)
      cardY.value = event.pageY - (cardHeightRaw / 2)

      emit('drag', props.card)
    }
  }

  function handleEdit (card) {
    emit('edit', card)
  }

  function handleDelete (cardId) {
    emit('delete', cardId)
  }

  function handleAssignToMe () {
    const cardId = props.card.id
    const user = JSON.parse(localStorage.getItem('user'))
    emit('assign', { cardId, user })
  }

  function isAssigned () {
    const user = JSON.parse(localStorage.getItem('user'))
    const assigns = props.card.assigns
    const isExist = !!assigns.find(a => a.id === user.id)
    return isExist
  }
</script>