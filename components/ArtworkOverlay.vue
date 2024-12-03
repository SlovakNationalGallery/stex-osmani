<template>
  <ClientOnly>
    <div class="absolute z-10 top-20 bottom-0 inset-x-0 pointer-events-none bg-black/80">
      <div
        class="absolute bottom-4 left-4 right-[350px] top-0 z-50 mt-4 overflow-hidden rounded-xl bg-neutral-700 pointer-events-auto"
      >
        <ZoomViewer
          v-if="deepZoomSrc"
          :tile-sources="`assets/tour/${deepZoomSrc}`"
          @close="$emit('close')"
        />
        <img
          v-else
          class="h-full w-full object-contain"
          :src="`assets/tour/${thumbnailSrc}`"
        />
        <button
          @click="$emit('close')"
          class="absolute right-4 top-4 z-50 rounded-xl border-2 border-black bg-white p-0.5"
        >
          <X class="h-8 w-8" />
        </button>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup>
import ZoomViewer from "~/components/ZoomViewer.vue";
import X from "~/assets/img/x-mark.svg?component";

const props = defineProps(["item"]);
const { thumbnailSrc, deepZoomSrc } = props.item;
</script>
