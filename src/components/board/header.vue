<template>
  <div class="w-full h-[110px] flex justify-between px-[50px] pt-[20px]">
    <div class="w-max">
      <router-link
        class="w-max flex items-center gap-2 select-none cursor-pointer hover:bg-black/10 transition-all px-3 py-1 rounded-full"
        to="/app/board"
      >
        <icon icon="tabler:arrow-left" class="text-xl" />
        <div class="max-w-[450px] line-clamp-1 break-all font-semibold">
          {{ board.name }}
        </div>
      </router-link>
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
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { Icon } from '@iconify/vue'
  import { getBoardDetail } from '../../services/board'

  import memberDetail from './member-detail.vue'

  const route = useRoute()
  const board = ref({})
  const detailMemberShow = ref(false)

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

  onMounted(() => {
    handleGetDetail()
  })
</script>