<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-10"
    @click.self="handleClose"
  >
    <div class="w-max h-max bg-white rounded-xl p-5 space-y-5">
      <div class="text-lg font-semibold">Tambah Card</div>
      <input
        v-model="form.title"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Judul Pekerjaan"
      >
      <input
        v-model="form.point"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Jumlah Point"
        type="number"
      >
      <textarea
        v-model="form.description"
        placeholder="Tulis Deskripsi Pekerjaan"
        class="block w-[300px] h-[100px] border rounded-md px-5 py-2 outline-none"
      />
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

  const form = reactive({
    title: '',
    description: '',
    point: null
  })

  const emit = defineEmits(['update:show', 'submit'])

  function handleClose () {
    form.title = ''
    form.description = ''
    form.point = null
    emit('update:show', false)
  }

  function handleSubmit () {
    emit('submit', form)
    handleClose()
  }

  watch(() => props.card, () => {
    form.title = props.card.title || ''
    form.description = props.card.description || ''
    form.point = props.card.point || null
  })
</script>