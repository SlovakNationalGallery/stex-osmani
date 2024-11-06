<script setup lang="ts">
import type { Micrio } from "../components/Micrio.vue";
import XMark from "~/assets/img/x-mark.svg?component";
import Question from "~/assets/img/question.svg?component";
import Navbar from "~/layouts/Navbar.vue";
import TransitionOpacity from "~/components/TransitionOpacity.vue";
import EyeIcon from "~/assets/img/eye.svg?component";

const micrio = ref<Micrio["Instance"]>();

const { locale } = useI18n();
const lang = ref(locale.value);
const isOpenHint = ref(true);
const toggleHint = () => (isOpenHint.value = !isOpenHint.value);

const homescreenTimer = useTimer(60000, () => {
  navigateTo("/");
});

const hintTimer = useTimer(10000, () => {
  isOpenHint.value = true;
});

watch(locale, async () => {
  micrio.value?.tour?.cancel();
  await micrio.value?.camera.flyToFullView();
  lang.value = locale.value;
});

onMounted(() => {
  //Prevent right-click actions
  document.addEventListener("contextmenu", (e) => e.preventDefault());
});

watch(micrio, (micrio, oldMicrio) => {
  if (!micrio) return;

  // Reset camera on navigation
  if (micrio.events.isNavigating) {
    micrio.tour?.cancel();
    return;
  }

  if (oldMicrio) {
    isOpenHint.value = false;
  }

  homescreenTimer.reset();
  hintTimer.reset();
});

function onMicrioError() {
  window.location.reload();
}
</script>

<template>
  <div
    class="absolute inset-0 select-none overflow-hidden bg-black/50 font-body"
  >
    <Navbar ref="navbar">
      <template v-slot:icon class="w-20">
        <NuxtLink
          to="/"
          class="flex h-full w-20 items-center justify-center border-r-3 border-black bg-blue-ribbon-600"
        >
          <XMark class="h-10 w-10 text-white" />
        </NuxtLink>
      </template>
      <template v-slot:content>
        <div class="flex items-end gap-6 px-6">
          <div
            class="flex items-center gap-2 rounded-lg bg-black/50 px-2 py-1 text-white"
          >
            <EyeIcon class="h-8 w-8" />
            <span class="font-bold">{{ $t("Interaktívna prehliadka") }}</span>
          </div>
          <span class="align-bottom font-display text-3xl font-bold"
            >Dielo</span
          >
          <span class="pb-[3px] align-bottom font-body text-2xl font-medium"
            >Author, Dating</span
          >
        </div>
      </template>
      <template v-slot:hint>
        <button @click="toggleHint">
          <Question class="h-10 w-10" />
        </button>
      </template>
    </Navbar>
    <!-- This will become initial Modal -->
    <div class="w-screen h-20 bg-white z-50" id="start-overlay">

    </div>
    <div class="h-full w-full">
      <ClientOnly>
        <NuxtErrorBoundary @error="onMicrioError">
          <Micrio
            id="aYdqm"
            :lang="lang"
            @show="micrio = $event"
            @update="micrio = $event"
            @marker-open="onMarkerOpen"
            >
            <template #marker="marker">
              <PulsatingMarker
                class="visible absolute -left-1/2 -top-1/2 flex h-16 w-16 items-center justify-center"
                @click.stop="
                  micrio?.marker?.id === marker.id
                    ? marker.close()
                    : marker.open()
                "
                :open="micrio?.marker?.id === marker.id"
              >
                {{ (marker.index ?? 0) + 1 }}
              </PulsatingMarker>
            </template>
          </Micrio>
        </NuxtErrorBoundary>
        <!-- Custom marker -->
        <TransitionOpacity>
          <div
            v-if="micrio?.tour && micrio?.marker"
            class="pointer-events-none absolute inset-0 flex p-10"
            :class="
              (() => {
                if (micrio.marker.class?.includes('top-left'))
                  return 'items-start justify-start';
                if (micrio.marker.class?.includes('top-right'))
                  return 'top-32 items-start justify-end';
                if (micrio.marker.class?.includes('bottom-right'))
                  return 'items-end justify-end';
                if (micrio.marker.class?.includes('bottom-left'))
                  return 'items-end justify-start';

                // default: bottom-right
                return 'items-end justify-end';
              })()
            "
          >
            <Annotation
              @onPrevClick="micrio.tour.controls.previous"
              @onNextClick="micrio.tour.controls.next"
            >
              <template #header>
                <span>{{ (micrio.tour.currentStep ?? 0) + 1 }}. </span>
                <span>{{ micrio.marker.title }}</span>
              </template>
              <template #body>
                <div v-html="micrio.marker.body" class="text-xl" />
              </template>
            </Annotation>
          </div>
        </TransitionOpacity>
      </ClientOnly>
    </div>
  </div>
</template>
