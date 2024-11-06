<template>
  <div class="pointer-events-none flex p-16">
    <div class="max-w-lg rounded-xl border-2 border-black bg-white p-6">
      <div
        class="pointer-events-auto flex items-center justify-between gap-4 pb-5 pt-2"
      >
        <button @click="$emit('onPrevClick')">
          <ArrowLeft />
        </button>
        <h3 class="font-display text-2xl font-bold">
          <slot name="header"></slot>
        </h3>
        <button @click="$emit('onNextClick')">
          <ArrowLeft class="rotate-180" />
        </button>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from "~/assets/img/arrow-left.svg?component";
</script>