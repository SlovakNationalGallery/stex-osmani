<template>
  <div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="value"
      @mousemove="$emit('mousemove', value)"
      @mousedown="$emit('mousedown')"
      @mouseup="$emit('mouseup', value)"
      class="slider-thumb h-2 w-full appearance-none overflow-hidden rounded-full bg-white/20"
    />
    <!-- Progress Bar Overlay -->
    <div
      class="pointer-events-none absolute left-0 top-0 h-2 rounded-full bg-white"
      :style="{
        width: `calc(${((value - (min - 4)) / (max + 4 - min)) * 100}%)`,
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

const model = defineModel();
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  modelValue: { type: Number, default: 0 },
});

const emit = defineEmits(["mousedown", "mouseup", "mousemove"]);

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
  },
);
</script>

<style scoped>
/* Base slider styling */
.slider-thumb {
  appearance: none;
  width: 100%;
}

/* Custom track */
.slider-thumb::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background-color: transparent;
  cursor: pointer;
}
.slider-thumb::-moz-range-track {
  width: 100%;
  height: 8px;
  background-color: transparent;
  cursor: pointer;
}

/* Custom thumb styling */
.slider-thumb::-webkit-slider-thumb {
  opacity: 0%;
  cursor: pointer;
}
.slider-thumb::-moz-range-thumb {
  opacity: 0%;
  cursor: pointer;
}
</style>
