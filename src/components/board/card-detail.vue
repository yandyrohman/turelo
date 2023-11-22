<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10"
    @click.self="handleClose"
  >
    <div class="w-[500px] h-max bg-white rounded-xl p-5 space-y-5">
      <div class="w-full flex justify-between items-center mb-[-10px] select-none">
        <div class="text-[14px] text-zinc-500">Detail</div>
        <div class="flex gap-2">
          <div
            class="w-[30px] h-[30px] flex justify-center items-center hover:bg-zinc-200 cursor-pointer rounded-md"
            @click="handleEdit"
          >
            <icon icon="tabler:edit" />
          </div>
          <div
            class="w-[30px] h-[30px] flex justify-center items-center hover:bg-zinc-200 cursor-pointer rounded-md"
            @click="handleDelete"
          >
            <icon icon="tabler:trash" />
          </div>
        </div>
      </div>
      <div class="w-full font-semibold text-xl break-all">
        {{ props.card.title }}
      </div>
      <div class="w-full flex justify-between items-center">
        <div class="w-max flex gap-1 pt-2">
          <div
            v-for="assign in props.card.assigns"
            class="relative w-max h-max flex justify-center"
          >
            <img
              class="w-[30px] h-[30px] rounded-full"
              draggable="false"
              :src="assign.picture"
              @mouseover="() => assign.isShowMemberName = true"
              @mouseleave="() => assign.isShowMemberName = false"
            >
            <div
              v-if="assign.isShowMemberName"
              class="absolute w-max max-w-[200px] h-[30px] top-[30px] bg-black flex items-center px-3 rounded-md"
            >
              <span class="line-clamp-1 text-white">
                {{ assign.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="w-max h-max bg-black/10 rounded-full font-semibold text-sm text-zinc-500 select-none px-3 py-1">
          {{ props.card.point }} Poin
        </div>
      </div>
      <hr >
      <div class="w-full">
        {{ props.card.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits, defineProps } from 'vue'
  import { Icon } from '@iconify/vue'

  import Swal from 'sweetalert2'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    card: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(['update:show', 'edit', 'delete'])

  function handleClose () {
    emit('update:show', false)
  }

  function handleEdit () {
    emit('edit', props.card)
    emit('update:show', false)
  }

  async function handleDelete () {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Hapus card ini?',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      confirmButtonColor: '#D32F2F',
      cancelButtonText: 'Batal'
    })
    
    if (isConfirmed) {
      emit('delete', props.card.id)
      emit('update:show', false)
    } 
  }
</script>