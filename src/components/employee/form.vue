<template>
  <div
    v-if="props.show"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
    @click.self="handleClose"
  >
    <div class="w-max h-max bg-white rounded-xl p-5 space-y-5">
      <div class="text-lg font-semibold">Tambah Karyawan</div>
      <photo-form v-model="form.picture" />
      <input
        v-model="form.email"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Email Karyawan"
      >
      <input
        v-model="form.password"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Password Karyawan"
      >
      <input
        v-model="form.name"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Nama Karyawan"
      >
      <select
        v-model="form.position"
        class="block w-[300px] h-[40px] border rounded-md px-5"
      >
        <option value="" hidden>- Pilih Jabatan -</option>
        <option value="owner">Owner</option>
        <option value="manager">Product Manager</option>
        <option value="frontend">Frontend Dev</option>
        <option value="backend">Backend Dev</option>
        <option value="uiux">UI/UX</option>
        <option value="qa">QA Tester</option>
      </select>
      <input
        v-model="form.salary"
        class="block w-[300px] h-[40px] border rounded-md px-5"
        placeholder="Masukan Gaji Karyawan"
        type="number"
      >
      <select
        v-model="form.status"
        class="block w-[300px] h-[40px] border rounded-md px-5"
      >
        <option value="" hidden>- Pilih Status -</option>
        <option value="permanent">Karyawan Tetap</option>
        <option value="contract">Karyawan Kontrak</option>
        <option value="apprentice">Karyawan Magang</option>
      </select>
      <select
        v-model="form.role"
        class="block w-[300px] h-[40px] border rounded-md px-5"
      >
        <option value="" hidden>- Pilih Role System -</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
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
    employee: {
      type: Object,
      default: () => ({})
    }
  })

  const form = reactive({
    picture: '',
    email: '',
    password: '',
    name: '',
    position: '',
    salary: null,
    status: '',
    role: 'user',
  })

  const emit = defineEmits(['update:show', 'submit'])

  function handleClose () {
    form.picture = ''
    form.email = ''
    form.password = ''
    form.name = ''
    form.position = ''
    form.salary = null
    form.status = ''
    form.role = ''
    emit('update:show', false)
  }

  function handleSubmit () {
    emit('submit', form)
    handleClose()
  }

  watch(() => props.employee, () => {
    form.picture = props.employee.picture || ''
    form.email = props.employee.email || ''
    form.password = props.employee.password || ''
    form.name = props.employee.name || ''
    form.position = props.employee.position || ''
    form.salary = props.employee.salary || null
    form.status = props.employee.status || ''
    form.role = props.employee.role || ''
  })
</script>