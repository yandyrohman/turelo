<template>
  <label class="flex items-center gap-3 w-full border rounded-md p-3">
    <img
      v-if="props.modelValue"
      class="h-[70px]"
      :src="props.modelValue"
    >
    <input
      class="w-[100px]" type="file"
      @change="handleChange"
    >
    <div v-if="!props.modelValue">Pilih Foto</div>
  </label>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'
  import axios from 'axios'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  async function handleChange (event) {
    const file = event.target.files[0]

    const formData = new FormData()

    formData.append('key', '79907262ab011cb05701bfa92ae698e6')
    formData.append('image', file)

    const { data } = await axios.post('https://api.imgbb.com/1/upload', formData)

    const photoUrl = data.data.thumb.url
    emit('update:modelValue', photoUrl)
}
</script>