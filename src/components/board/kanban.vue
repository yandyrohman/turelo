<template>
  <div class="shrink-0 w-[350px] h-full bg-white rounded-md flex flex-col">
    <div class="mx-5 my-2 font-bold text-zinc-500 select-none">
      {{ props.name }}
    </div>
    <div class="w-full h-full overflow-y-auto scrollbar-thin space-y-3 pb-5 px-3">
      <kanban-card
        v-for="card in state.cards"
        :key="card.id"
        :card="card"
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
      @submit="handleSubmitForm"
    />
  </teleport>
</template>

<script setup>
  import { defineProps, reactive, onMounted } from 'vue'
  import { Icon } from '@iconify/vue'
  import { getCard, createCard } from '../../services/kanban'
  
  import kanbanForm from './kanban-form.vue'
  import kanbanCard from './card.vue'

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  })

  const state = reactive({
    cards: [],
    showForm: false
  })

  function handleShowForm () {
    state.showForm = true
  }

  async function handleGetCard () {
    const { data } = await getCard()
    const filteredData = data.filter(d => d.status === props.status).sort((a, b) => a.timestamp - b.timestamp)
    console.log(filteredData)
    state.cards = filteredData
  }

  async function handleSubmitForm ({ title, description, point }) {
    const status = props.status
    await createCard({ title, description, point, status })
    handleGetCard()
  }

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
</style>