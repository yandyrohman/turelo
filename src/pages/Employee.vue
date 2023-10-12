<template>
  <div class="w-full h-max pb-[50px]">
    <div class="w-full flex justify-center">
      <div class="w-[1100px] h-[100px] flex justify-between items-center">
        <div class="font-semibold select-none text-xl">List Karyawan</div>
        <button
          class="px-5 py-2 bg-green-600 text-white font-semibold rounded-md"
          @click="handleShowForm"
        >
          Tambah
        </button>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-[1100px] h-max">
        <div class="w-full h-max rounded-md overflow-hidden shadow-md">
          <div class="w-full flex py-3 bg-zinc-200 select-none px-5">
            <div class="w-[25%] text-zinc-500">Nama Karyawan</div>
            <div class="w-[16.25%] text-zinc-500">Jabatan</div>
            <div class="w-[16.25%] text-zinc-500">Gaji</div>
            <div class="w-[16.25%] text-zinc-500">Status</div>
            <div class="w-[26.25%] text-zinc-500">Role System</div>
          </div>
          <employee-person
            v-for="employee in state.employees"
            :employee="employee"
          />
        </div>
      </div>
    </div>
  </div>
  <employee-form
    v-model:show="state.showForm"
    @submit="handleSubmitForm"
  />
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import { getEmployee, createEmployee } from '../services/employee'

  import employeePerson from '../components/employee/person.vue'
  import employeeForm from '../components/employee/form.vue'

  const state = reactive({
    employees: [],
    showForm: false
  })

  async function handleGetEmployee () {
    const { data } = await getEmployee()
    state.employees = data
  }

  function handleShowForm () {
    state.showForm = true
  }

  function handleSubmitForm ({ email, password, name, position, salary, status, role }) {
    createEmployee({ email, password, name, position, salary, status, role })
  }

  onMounted(() => {
    handleGetEmployee()
  })
</script>