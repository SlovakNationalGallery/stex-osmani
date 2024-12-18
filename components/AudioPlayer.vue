<template>
  <div>
    <div class="flex gap-16 pb-6">
      <button @click="fastBackwards(10)" class="flex items-center gap-2">
        <span class="font-bold">10s</span><ClockCounterClockwise class="w-8" />
      </button>
      <button @click="playPause">
        <Pause class="w-8" v-if="isPlaying" />
        <Play class="w-8" v-else />
      </button>
      <button class="flex items-center gap-2">
        <ClockClockwise @click="fastForwards(10)" class="w-8" /><span
          class="font-bold"
          >10s</span
        >
      </button>
    </div>
    <RangeSlider
      class="relative flex w-full flex-col items-center"
      :min="0"
      :max="duration"
      :model-value="currentTime"
      :step="1"
      @mousedown="seekUp"
      @mouseup="seekDown"
      @mousemove="seekMove"
    />
    <!-- Time indicators -->
    <div class="mt-2 flex w-full justify-between text-sm text-black">
      <span>{{ formattedTime }}</span>
      <span>{{ formattedDuration }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import ClockClockwise from "~/assets/img/clock-clockwise.svg?component";
import ClockCounterClockwise from "~/assets/img/clock-counter-clockwise.svg?component";
import Play from "~/assets/img/play.svg?component";
import Pause from "~/assets/img/pause.svg?component";

const props = defineProps(["index"]);

const isPlaying = defineModel();
const audio = ref(new Audio(`assets/audio/audio_${props.index || 1}.mp3`));
const currentTime = ref(0);
const duration = ref(0);
const isSeeking = ref(false);

onMounted(() => {
  isPlaying.value = true;
});

watchEffect(() => {
  if (isPlaying.value) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
});

const playPause = () => {
  isPlaying.value = !isPlaying.value;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const formattedTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));

const seekMove = (value) => {
  currentTime.value = value;
};

const fastBackwards = (value) =>
  (audio.value.currentTime = Math.max(0, audio.value.currentTime - value));

const fastForwards = (value) =>
  (audio.value.currentTime = Math.min(
    duration.value,
    audio.value.currentTime + value,
  ));

const seekUp = () => {
  isSeeking.value = true;
  audio.value.pause();
};

const seekDown = (value) => {
  isSeeking.value = false;
  audio.value.currentTime = value;
  isPlaying.value = true;
  audio.value.play();
};

audio.value.addEventListener("loadedmetadata", () => {
  duration.value = audio.value.duration;
});

audio.value.addEventListener("timeupdate", () => {
  if (isSeeking.value) return;
  currentTime.value = audio.value.currentTime;
});

audio.value.addEventListener("ended", () => {
  isPlaying.value = false;
  audio.value.pause();
  audio.value.currentTime = 0;
});

onUnmounted(() => audio.value.pause());
</script>
