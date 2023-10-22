<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10"
    @click.self="handleClose"
  >
    <div class="w-max h-max bg-white rounded-xl p-5 space-y-5">
      <div class="text-lg font-semibold">Tambah Board</div>
      <photo-form v-model="form.picture" />
      <input
        v-model="form.name"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Nama Board"
      >
      <div class="w-full flex gap-3 justify-end pt-5">
        <button
          class="px-5 py-2 bg-white border font-semibold rounded-md"
          @click="handleClose"
        >
          Batal
        </button>
        <button
          class="px-5 py-2 bg-green-600 text-white font-semibold rounded-md"
          @click="handleSubmit"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits, defineProps, reactive, watch } from 'vue'
  import photoForm from '../photo-form.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    board: {
      type: Object,
      default: () => ({})
    }
  })

  const form = reactive({
    picture: '',
    name: '',
  })

  const emit = defineEmits(['update:show', 'submit'])

  function handleClose () {
    form.picture = ''
    form.name = ''
    emit('update:show', false)
  }

  function handleSubmit () {
    emit('submit', form)
  }

  watch(() => props.board, () => {
    form.picture = props.board.picture || ''
    form.name = props.board.name || ''
  })
</script>