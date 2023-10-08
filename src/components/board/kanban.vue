<template>
  <div class="w-[350px] h-full bg-white rounded-md flex flex-col">
    <div class="mx-5 my-2 font-bold text-zinc-500 select-none">
      {{ props.name }}
    </div>
    <div class="w-full h-full overflow-y-auto scrollbar-thin space-y-3 pb-5 px-3">
      <div
        v-for="i in 10"
        class="w-full h-max bg-white p-5 rounded-md shadow-md border border-zinc-100 select-none cursor-pointer space-y-2 hover:bg-zinc-50"
      >
        <div class="w-max h-max bg-black/10 rounded-full font-semibold text-sm text-zinc-500 select-none px-2">
          10 Poin
        </div>
        <div class="w-full line-clamp-2 font-semibold text-xl leading-tight py-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis deserunt suscipit eum quidem sunt molestiae sint, repudiandae repellendus illo magnam quasi molestias. Sed magni corrupti vitae dolorum aliquam optio!
        </div>
        <div class="text-sm text-zinc-500 line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus libero cumque tempora possimus in doloremque ea nesciunt pariatur corrupti provident corporis vel exercitationem error recusandae quia dolorem animi, ipsa soluta!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus libero cumque tempora possimus in doloremque ea nesciunt pariatur corrupti provident corporis vel exercitationem error recusandae quia dolorem animi, ipsa soluta!
        </div>
        <div class="w-max flex gap-1 pt-2">
          <img
            v-for="i in 6"
            class="w-[30px] h-[30px] rounded-full"
            draggable="false"
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
          >
          <div class="w-[30px] h-[30px] rounded-full bg-zinc-100 flex justify-center items-center hover:bg-zinc-200">
            <icon icon="tabler:dots" class="text-zinc-500" />
          </div>
          <div class="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-zinc-200 border-2 border-dashed">
            <icon icon="tabler:user-plus" class="text-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    cards: {
      type: Array,
      default: () => ([])
    }
  })
</script>

<style>
  .scrollbar-thin::-webkit-scrollbar {
    width: 5px;
    background: #EEE;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
</style>