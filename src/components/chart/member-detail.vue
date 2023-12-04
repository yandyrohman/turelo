<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10"
    @click.self="handleClose"
  >
    <div class="w-[500px] h-max bg-white rounded-xl p-5 space-y-5">
      <div class="w-full flex justify-between items-center mb-5 select-none">
        <div class="text-[14px] text-zinc-500">Semua Member</div>
      </div>
      <div class="w-full space-y-5 overflow-y-auto max-h-[410px]">
        <div
          v-for="member in props.members"
          class="w-full flex items-center gap-5"
        >
          <img
            class="shrink-0 w-[40px] h-[40px] rounded-full object-cover"
            :src="member.picture"
          />
          <div class="w-full">
            <div class="font-semibold line-clamp-1 break-all">
              {{ member.name }}
            </div>
            <div class="line-clamp-1 break-all text-zinc-500 text-[14px]">
              {{ member.email }}
            </div>
          </div>
          <div class="capitalize">
            {{ member.position }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits, defineProps } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    members: {
      type: Array,
      default: () => ([])
    }
  })

  const emit = defineEmits(['update:show'])

  function handleClose () {
    emit('update:show', false)
  }
</script>