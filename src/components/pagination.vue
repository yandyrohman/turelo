<template>
  <div class="w-max select-none flex items-center gap-2">
    <div
      class="w-[30px] h-[30px] border border-zinc-400 flex justify-center items-center rounded-md cursor-pointer bg-white/50 hover:bg-white/70 text-zinc-500"
      :class="{
        '!bg-transparent border-zinc-400/30 hover:!border-zinc-400/30 !text-zinc-500/40 !cursor-not-allowed': true
      }"
    >
      <icon icon="tabler:chevron-left-pipe" />
    </div>
    <div
      class="w-[30px] h-[30px] border border-zinc-400 flex justify-center items-center rounded-md cursor-pointer bg-white/50 hover:bg-white/70 text-zinc-500"
      :class="{
        '!bg-transparent border-zinc-400/30 hover:!border-zinc-400/30 !text-zinc-500/40 !cursor-not-allowed': true
      }"
    >
      <icon icon="tabler:chevron-left" />
    </div>
    <div class="px-3">1 dari 20</div>
    <div
      class="w-[30px] h-[30px] border border-zinc-400 flex justify-center items-center rounded-md cursor-pointer bg-white/50 hover:bg-white/70 text-zinc-500"
      :class="{
        '!bg-transparent border-zinc-400/30 hover:!border-zinc-400/30 !text-zinc-500/40 !cursor-not-allowed': false
      }"
    >
      <icon icon="tabler:chevron-right" />
    </div>
    <div
      class="w-[30px] h-[30px] border border-zinc-400 flex justify-center items-center rounded-md cursor-pointer bg-white/50 hover:bg-white/70 text-zinc-500"
      :class="{
        '!bg-transparent border-zinc-400/30 hover:!border-zinc-400/30 !text-zinc-500/40 !cursor-not-allowed': false
      }"
    >
      <icon icon="tabler:chevron-right-pipe" />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>