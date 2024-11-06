<script setup lang="ts">
import type { Micrio } from "../components/Micrio.vue";
import XMark from "~/assets/img/x-mark.svg?component";
import Question from "~/assets/img/question.svg?component";
import Navbar from "~/layouts/Navbar.vue";
import HandTap from "~/assets/img/hand-tap.svg?component";
import MagnifyingGlassPlus from "~/assets/img/magnifying-glass-plus.svg?component";
import ArrowOutCardinal from "~/assets/img/arrow-out-cardinal.svg?component";
import TransitionOpacity from "~/components/TransitionOpacity.vue";
import EyeIcon from "~/assets/img/eye.svg?component";

const cameraPreset = ref<"zoom-out" | null>(null);
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
  cameraPreset.value = "zoom-out";
});

onMounted(() => {
  //Prevent right-click actions
  document.addEventListener("contextmenu", (e) => e.preventDefault());
});

watch(micrio, (micrio, oldMicrio) => {
  if (!micrio) return;

  // Initialization
  if (!oldMicrio && micrio) {
    cameraPreset.value = "zoom-out";
  }

  // Reset camera on navigation
  if (micrio.events.isNavigating) {
    micrio.tour?.cancel();
    return;
  }

  if (micrio.tour) {
    cameraPreset.value = null;
  }

  if (oldMicrio) {
    isOpenHint.value = false;
  }

  homescreenTimer.reset();
  hintTimer.reset();
});

watch(cameraPreset, async (preset) => {
  if (preset === "zoom-out") {
    await micrio.value?.camera.flyToFullView();
  }
});

// Micrio only emits tour-started when the camera has settled
// so we use marker-open as a proxy event
function onMarkerOpen() {
  cameraPreset.value = null;
}

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
    <TransitionOpacity>
      <div
        v-if="isOpenHint"
        class="absolute right-9 top-32 z-10 grid grid-cols-3 gap-8 rounded-xl bg-black/75 p-6"
      >
        <div
          class="absolute -top-[25px] right-24 h-0 w-0 border-b-[25px] border-l-[25px] border-r-[25px] border-b-black/75 border-l-transparent border-r-transparent"
        />
        <div class="flex w-48 flex-col items-center gap-2.5 text-white">
          <HandTap class="h-8 w-8" />
          <span class="text-xl font-bold">{{ $t("Open hotspot") }}</span>
          <span>{{ $t("Tap a number") }}</span>
        </div>
        <div class="flex w-48 flex-col items-center gap-2.5 text-white">
          <MagnifyingGlassPlus class="h-8 w-8" />
          <span class="text-xl font-bold">{{ $t("Zoom") }}</span>
          <span>{{ $t("Pinch with two fingers") }}</span>
        </div>
        <div class="flex w-48 flex-col items-center gap-2.5 text-white">
          <ArrowOutCardinal class="h-8 w-8" />
          <span class="text-xl font-bold">{{ $t("Pan") }}</span>
          <span>{{ $t("Drag with two fingers") }}</span>
        </div>
      </div>
    </TransitionOpacity>
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
