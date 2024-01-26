<template>
  <template v-if="props.proofUrl || temporaryProof">
    <a
      :href="props.proofUrl ?? temporaryProof"
      target="_blank"
      class="text-blue-500 hover:underline"
    >
      Lihat Bukti
    </a>
  </template>
  <template v-else>
    <span v-if="isLoading">uploading..</span>
    <label
      v-else
      :for="`proof-${props.id}`"
      class="px-[10px] py-[2px] bg-green-500 text-white rounded-[10px] select-none cursor-pointer"
    >
      Upload Bukti 
    </label>
  </template>
  <input
    :id="`proof-${props.id}`"
    type="file"
    hidden
    @change="handleChange"
  >
</template>

<script setup>
  import { defineProps, ref } from 'vue'
  import { updateProofCard } from '../../services/kanban'

  import axios from 'axios'

  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    proofUrl: {
      type: String,
      default: null
    }
  })

  const isLoading = ref(false)
  const temporaryProof = ref(null)

  async function handleChange (event) {
    const file = event.target.files[0]
    const uploadPreset = 'xjupwzuc'
    const cloudName = 'daryqrww3'
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    isLoading.value = true

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    
    const cardId = props.id
    const proofUrl = response?.data?.url
    await updateProofCard(cardId, proofUrl)
  
    isLoading.value = false
    temporaryProof.value = proofUrl
  }
</script>