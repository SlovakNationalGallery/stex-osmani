<template>
  <div>
    <button @click="playPause">PLAY</button>
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
const props = defineProps(["index"]);

const audio = ref(new Audio(`assets/audio/audio_${props.index || 1}.mp3`));
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isSeeking = ref(false);
const wasStarted = ref(false);

onMounted(() => {
  isPlaying.value = true;
  audio.value.play();
});

const playPause = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    wasStarted.value = true;
    audio.value.play();
  }
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

const seekUp = () => {
  isSeeking.value = true;
  audio.value.pause();
};

const seekDown = (value) => {
  isSeeking.value = false;
  audio.value.currentTime = value;
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
  wasStarted.value = false;
  audio.value.pause();
  audio.value.currentTime = 0;
});

onUnmounted(() => audio.value.pause());
</script>
