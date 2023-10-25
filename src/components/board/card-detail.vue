<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10"
    @click.self="handleClose"
  >
    <div class="w-max h-max bg-white rounded-xl p-5 space-y-5">
      ini detail
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
    card: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(['update:show'])

  function handleClose () {
    emit('update:show', false)
  }
</script>