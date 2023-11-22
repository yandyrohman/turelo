<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full h-[100px] flex justify-center items-center font-semibold select-none text-xl">Semua Board</div>
    <div class="w-full flex justify-center">
      <div class="w-[1000px] h-max grid grid-cols-3 gap-[40px]">
        <router-link
          v-for="board in state.boards"
          :key="board._id"
          class="relative w-full h-[180px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer select-none"
          :to="'/app/board/' + board.id"
        >
          <img
            class="absolute w-full h-full object-cover top-0 left-0"
            draggable="false"
            :src="board.picture"
          >
          <div class="absolute w-full h-full top-0 left-0 z-10 p-3 flex flex-col justify-between">
            <div class="w-max max-w-full px-3 py-1 bg-white/50 rounded-[10px] select-none">
              <span class="line-clamp-2 font-semibold break-all">
                {{ board.name }}
              </span>
            </div>
            <div class="w-max flex px-3 py-1 bg-white/50 rounded-[10px] space-x-[-10px] select-none">
              <img
                v-for="member in board.members.slice(0, 4)"
                draggable="false"
                class="w-[30px] h-[30px] object-cover rounded-full"
                :src="member.picture"
              >
              <div
                v-if="board.members.length > 4"
                class="w-[30px] h-[30px] rounded-full bg-white border-dashed flex justify-center items-center text-sm font-semibold text-zinc-400 select-none"
              >
                {{ board.members.length - 4 }}+
              </div>
              <div v-if="board.members.length === 0">
                Belum ada anggota
              </div>
            </div>
          </div>
        </router-link>
        <div
          class="w-full h-[180px] rounded-lg transition-all bg-black/5 border-2 border-dashed border-zinc-400 select-none cursor-pointer hover:bg-black/10 flex justify-center items-center"
          @click="handleAddBoard"
        >
          <icon icon="tabler:plus" class="text-[40px] text-zinc-500" />
        </div>
      </div>
    </div>
  </div>
  <board-form
    v-model:show="state.showForm"
    :employee="state.selectBoard"
    @submit="handleSubmitForm"
  />
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import { Icon } from '@iconify/vue'
  import { createBoard, getBoard } from '../services/board'

  import boardForm from '../components/board/form.vue'

  const state = reactive({
    boards: [],
    selectBoard: {},
    showForm: false
  })

  async function handleGetBoard () {
    const { data } = await getBoard()
    state.boards = data
  }

  function handleAddBoard () {
    state.selectBoard = {}
    state.showForm = true
  }

  async function handleSubmitForm ({ picture, name }) {
    await createBoard({ picture, name })
    handleGetBoard()
  }

  onMounted(() => {
    handleGetBoard()
  })
</script>