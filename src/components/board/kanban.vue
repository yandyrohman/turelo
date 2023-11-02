<template>
  <div
    :id="id"
    class="shrink-0 w-[350px] h-full bg-white rounded-md flex flex-col"
  >
    <div class="mx-5 my-2 font-bold text-zinc-500 select-none">
      {{ props.name }}
    </div>
    <div class="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin space-y-3 pb-5 px-3">
      <div
        v-if="cardOverThisKanban && props.dragover"
        class="w-full h-[150px] bg-zinc-200 rounded-md"
      />
      <kanban-card
        v-for="card in state.cards"
        :key="card.id"
        :card="card"
        @drag="handleDrag"
        @release="handleRelease"
        @edit="handleEditCard"
        @delete="handleDeleteCard"
        @assign="handleAssign"
      />
    </div>
    <div class="w-full p-3">
      <div
        class="w-full py-1 px-5 flex gap-2 items-center hover:bg-zinc-100 cursor-pointer select-none rounded-md text-zinc-600"
        @click="handleShowForm"
      >
        <icon icon="tabler:plus" />
        <span class="font-[500]">Tambah Card</span>
      </div>
    </div>
  </div>
  <teleport to="body">
    <kanban-form
      v-model:show="state.showForm"
      :card="state.selectCard"
      @submit="handleSubmitForm"
    />
  </teleport>
</template>

<script setup>
  import { defineProps, defineEmits, reactive, onMounted, computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCard, createCard, updateCard, updateStatusCard, deleteCard, assignCard } from '../../services/kanban'
  import { Icon } from '@iconify/vue'
  
  import kanbanForm from './kanban-form.vue'
  import kanbanCard from './card.vue'
  import Swal from 'sweetalert2'

  const route = useRoute()

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    hoverKanban: {
      type: String,
      default: null
    },
    dragover: {
      type: Boolean,
      default: false,
    },
    dragCard: {
      type: Object,
      default: () => ({})
    }
  })

  const state = reactive({
    cards: [],
    showForm: false,
    selectCard: {}
  })

  const cardOverThisKanban = computed(() => {
    return props.status === props.hoverKanban
  })

  const id = computed(() => {
    return `kanban-${props.status}`
  })

  const emit = defineEmits(['drag', 'release'])

  function handleShowForm () {
    state.selectCard = {}
    state.showForm = true
  }

  function handleEditCard (card) {
    state.selectCard = card
    state.showForm = true
  }

  async function handleGetCard () {
    const { data } = await getCard()
    const filteredData = data.filter(d => d.status === props.status).sort((a, b) => a.timestamp - b.timestamp)
    state.cards = filteredData
  }

  async function handleSubmitForm ({ id, title, description, point }) {
    const boardId = route.params.id
    const status = props.status
    if (id) {
      await updateCard(id, { title, description, point })
    } else {
      await createCard({ title, description, point, status, boardId })
    }
    handleGetCard()
  }

  function handleDrag (card) {
    emit('drag', card)
  }

  function handleRelease () {
    emit('release')
  }

  function handleEjectThisKanbanIfMatch () {
    const fromKanban = props.dragCard.status
    const isEjectOnThisKanban = fromKanban === props.status
    if (isEjectOnThisKanban) {
      const cardEjectId = props.dragCard.id
      const newStatus = props.hoverKanban
      state.cards = state.cards.filter(c => c.id !== cardEjectId)
      updateStatusCard(cardEjectId, newStatus)
    }
  }

  function handleInsertThisKanbanIfMatch () {
    if (cardOverThisKanban.value) {
      const insertCard = {...props.dragCard, status: props.status}
      state.cards = [insertCard].concat(state.cards)
    }
  }

  async function handleDeleteCard (cardId) {
    await deleteCard(cardId)
    handleGetCard()
  }
  
  async function handleAssign ({ cardId, user }) {
    await assignCard(cardId, user)
    handleGetCard()

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Berhasil Menandai',
      color: 'white'
    })
  }

  watch(() => props.dragover, () => {
    if (props.dragover === false) {
      handleEjectThisKanbanIfMatch()
      handleInsertThisKanbanIfMatch()
    }
  })

  onMounted(() => {
    handleGetCard()
  })
</script>

<style>
  .scrollbar-thin::-webkit-scrollbar {
    width: 5px;
    background: #EEE;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #666;
  }

  .colored-toast.swal2-icon-success {
    background-color: #a5dc86 !important;
  }
</style>