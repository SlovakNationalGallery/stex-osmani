<template>
  <div>
    <span
      class="mx-auto bg-black/80 p-1 text-2xl"
      v-if="renderedText[0] && renderedText[0].text"
      >{{ renderedText[0].text }}</span
    >
  </div>
</template>
<script setup>
import moment from "moment";
const props = defineProps(["audioTime", "subtitleSrc"]);
const { data: subtitlesData } = await useFetch(`/assets/${props.subtitleSrc}`);

const renderedText = computed(() =>
  subtitlesData.value.filter((subtitle) => {
    const formattedAudioTime = moment.duration(
      parseFloat(props.audioTime),
      "seconds",
    );
    const formattedSubtitleStart = moment.duration(
      subtitle.start.replace(",", "."),
      "hh:mm:ss.SSS",
    );
    const formattedSubtitleEnd = moment.duration(
      subtitle.end.replace(",", "."),
      "hh:mm:ss.SSS",
    );

    if (formattedAudioTime < formattedSubtitleStart) {
      return false;
    }
    if (formattedAudioTime > formattedSubtitleEnd) {
      return false;
    }
    return true;
  }),
);
</script>
