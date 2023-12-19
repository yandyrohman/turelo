<template>
  <div class="w-full h-[110px] flex justify-between px-[50px] pt-[20px]">
    <div class="w-max">
      <div class="w-max flex items-center gap-5">
        <router-link
          class="w-max flex items-center gap-2 select-none cursor-pointer hover:bg-black/10 transition-all px-3 py-1 rounded-full"
          to="/app/board"
        >
          <icon icon="tabler:arrow-left" class="text-xl" />
          <div class="max-w-[450px] line-clamp-1 break-all font-semibold">
            {{ board.name }}
          </div>
        </router-link>
        <div
          v-if="profile.role === 'admin'"
          class="flex gap-3"
        >
          <div
            class="w-[35px] h-[35px] border border-zinc-400 hover:bg-zinc-400 rounded-full flex justify-center items-center cursor-pointer"
            @click="handleShowForm"
          >
            <icon icon="tabler:edit" />
          </div>
          <div
            class="w-[35px] h-[35px] border border-zinc-400 hover:bg-zinc-400 rounded-full flex justify-center items-center cursor-pointer"
            @click="handleDelete"
          >
            <icon icon="tabler:trash" />
          </div>
        </div>
      </div>
      <div class="text-sm text-zinc-600 select-none ml-[40px]">
        {{ board.cards?.length }} Total Card
      </div>
    </div>
    <div class="w-max">
      <div class="text-sm text-zinc-600 select-none mb-3">Semua Anggota</div>
      <div class="flex items-center">
        <div class="w-max flex rounded-[10px] space-x-[-10px] select-none">
          <img
            v-for="member in members"
            draggable="false"
            class="w-[30px] h-[30px] object-cover rounded-full"
            :src="member.picture"
          >
          <div
            v-if="board.members?.length > 4"
            class="w-[30px] h-[30px] rounded-full bg-zinc-100 flex justify-center items-center"
          >
            <icon icon="tabler:dots" class="text-zinc-500" />
          </div>
        </div>
        <div
          v-if="board.members?.length"
          class="text-sm underline select-none cursor-pointer font-semibold ml-2"
          @click="handleShowMemberDetail"
        >
          Lihat Semua
        </div>
        <div v-else>
          Tidak ada anggota
        </div>
      </div>
    </div>
  </div>
  <member-detail
    v-model:show="detailMemberShow"
    :members="board.members"
  />
  <board-form
    v-model:show="formShow"
    :board="board"
    @submit="handleUpdateBoard"
  />
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Icon } from '@iconify/vue'
  import { getBoardDetail, updateBoard, deleteBoard } from '../../services/board'

  import memberDetail from './member-detail.vue'
  import boardForm from './form.vue'
  import Swal from 'sweetalert2'

  const profile = JSON.parse(localStorage.getItem('user'))

  const route = useRoute()
  const router = useRouter()
  const board = ref({})
  const detailMemberShow = ref(false)
  const formShow = ref(false)

  const members = computed(() => {
    if (board.value.members) {
      return board.value.members.slice(0, 4)
    } else {
      return []
    }
  })

  async function handleGetDetail () {
    const boardId = route.params.id
    const { data } = await getBoardDetail(boardId)
    board.value = data
  }

  function handleShowMemberDetail () {
    detailMemberShow.value = true
  }

  function handleShowForm () {
    formShow.value = true
  }

  async function handleUpdateBoard ({ picture, name }) {
    const boardId = board.value.id
    await updateBoard(boardId, { picture, name })
    const { data } = await getBoardDetail(boardId)
    board.value = data
  }

  async function handleDelete () {
    const boardId = board.value.id
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Hapus board ini?',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      confirmButtonColor: '#D32F2F',
      cancelButtonText: 'Batal'
    })
    if (isConfirmed) {
      await deleteBoard(boardId)
      router.push('/app/board')
    } 
  }

  onMounted(() => {
    handleGetDetail()
  })
</script>