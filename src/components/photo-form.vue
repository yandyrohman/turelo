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
    const uploadPreset = 'xjupwzuc'
    const cloudName = 'daryqrww3'
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )

    const photoUrl = response?.data?.url
    emit('update:modelValue', photoUrl)
  }
</script>