<template>
  <div class="w-full bg-white flex px-5 select-none items-center py-4 border-b hover:bg-zinc-50">
    <div class="shrink-0 w-[25%] flex gap-4 pr-3 items-center">
      <img
        class="shrink-0 w-[40px] h-[40px] rounded-full object-cover"
        draggable="false"
        :src="props.employee.picture"
      >
      <div class="w-full">
        <div class="w-full font-semibold line-clamp-1 break-all">
          {{ props.employee.name }}
        </div>
        <div class="text-sm text-zinc-500 line-clamp-1 break-all">
          {{ props.employee.email }}
        </div>
      </div>
    </div>
    <div class="shrink-0 w-[16.25%] capitalize">
      {{ props.employee.position }}
    </div>
    <div class="shrink-0 w-[16.25%]">
      Rp {{ formatNumber(props.employee.salary) }}
    </div>
    <div class="shrink-0 w-[16.25%]">
      <template v-if="props.employee.status === 'permanent'">Karyawan Tetap</template>
      <template v-if="props.employee.status === 'contract'">Karyawan Kontrak</template>
      <template v-if="props.employee.status === 'apprentice'">Karyawan Magang</template>
    </div>
    <div class="shrink-0 w-[16.25%] capitalize">
      {{ props.employee.role }}
    </div>
    <div class="shrink-0 w-[10%] flex gap-4">
      <div
        class="w-[40px] h-[30px] flex justify-center items-center hover:bg-zinc-200 rounded-md cursor-pointer"
        @click="handleEdit"
      >
        <icon icon="tabler:edit" class="text-xl text-zinc-500" />
      </div>
      <div class="w-[40px] h-[30px] flex justify-center items-center hover:bg-zinc-200 rounded-md cursor-pointer">
        <icon icon="tabler:trash" class="text-xl text-zinc-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    employee: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(['edit'])

  function formatNumber (x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } else {
      return x
    }
  }

  function handleEdit () {
    emit('edit', props.id, props.employee)
  }
</script>