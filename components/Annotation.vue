<template>
  <div class="pointer-events-none flex z-10">
    <div
      class="w-[315px] rounded-xl border-2 border-white bg-black/70 fill-white text-white"
    >
      <div
        class="pointer-events-auto flex items-center justify-between gap-4 border-b-2 px-4 pb-3 pt-4"
      >
        <button @click="$emit('onPrevClick')">
          <ArrowLeft class="h-12 w-12 p-1" />
        </button>
        <h3 class="font-display text-2xl font-bold">
          <slot name="header"></slot>
        </h3>
        <button @click="$emit('onNextClick')">
          <ArrowLeft class="h-12 w-12 rotate-180 p-1" />
        </button>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from "~/assets/img/arrow-left.svg?component";
</script>
