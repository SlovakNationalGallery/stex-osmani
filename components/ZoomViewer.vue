<template>
  <div id="viewer" class="h-full w-full bg-neutral-700" />
</template>

<script setup>
import OpenSeaDragon from "openseadragon";
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps(["tileSources"]);
const viewer = ref(null);

onMounted(() => {
  viewer.value = OpenSeaDragon({
    id: "viewer",
    tileSources: props.tileSources,
    showNavigationControl: false,
    showNavigator: false,
  });
});

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.destroy();
  }
});
</script>
