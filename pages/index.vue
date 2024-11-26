<script setup lang="ts">
import type { Micrio } from "../components/Micrio.vue";
import Question from "~/assets/img/question.svg?component";
import Navbar from "~/layouts/Navbar.vue";
import TransitionOpacity from "~/components/TransitionOpacity.vue";
import Logo from "~/assets/img/logo.svg?component";

const micrio = ref<Micrio["Instance"]>();
const overlay = ref<"intro" | "hint" | null>("intro");

const { locale } = useI18n();
const lang = ref(locale.value);
const isAudioPlaying = ref(true);

//5 minute reload timer
const RELOAD_TIMER_DURATION = 5 * 60 * 1000;

const reloadTimer = useTimer(RELOAD_TIMER_DURATION, () => {
  window.location.reload();
});

const openHint = () => {
  overlay.value = "hint";
  isAudioPlaying.value = false;
};

const closeHint = () => {
  overlay.value = null;
};

const onMarkerOpen = () => {
  overlay.value = null;
};

watchEffect(() => {
  if (!overlay.value) {
    isAudioPlaying.value = true;
  }
});
watch(locale, async () => {
  micrio.value?.tour?.cancel();
  await micrio.value?.camera.flyToCoverView();
  lang.value = locale.value;
});

onMounted(() => {
  //Prevent right-click actions
  document.addEventListener("contextmenu", (e) => e.preventDefault());
});

watch(micrio, (micrio, oldMicrio) => {
  if (!micrio) return;

  // Initialization
  if (!oldMicrio && micrio) {
    overlay.value = "intro";
    micrio.camera.flyToCoverView();
  }

  if (oldMicrio?.tour && !micrio.tour) {
    overlay.value = "intro";
  }

  // Reset camera on navigation
  if (micrio.events.isNavigating) {
    micrio.tour?.cancel();
    return;
  }

  reloadTimer.reset();
});

function onMicrioError() {
  window.location.reload();
}
</script>

<template>
  <div
    class="absolute inset-0 select-none overflow-hidden bg-black/50 font-body"
  >
    <Navbar
      class="fixed top-0 z-10 flex h-20 w-full items-center justify-between bg-black/60 text-white"
      ref="navbar"
      v-if="!overlay"
    >
      <template v-slot:icon class="w-20">
        <div class="flex h-full w-20 items-center justify-center">
          <Logo class="h-10 w-10 text-white" />
        </div>
      </template>
      <template v-slot:content>
        <div class="flex items-end gap-6 px-6">
          <span class="align-bottom font-display text-3xl font-bold"
            >Dielo</span
          >
          <span class="pb-[3px] align-bottom font-body text-2xl font-medium"
            >Author, Dating</span
          >
        </div>
      </template>
      <template v-slot:hint>
        <button @click="openHint">
          <Question class="h-10 w-10" />
        </button>
      </template>
    </Navbar>
    <!-- Initial Idle screen -->
    <div
      class="absolute top-0 z-10 h-full w-full bg-black/60 text-white backdrop-blur-lg"
      v-show="overlay === 'intro'"
    >
      <Navbar class="flex h-20 w-full items-center justify-between">
        <template v-slot:icon class="w-20">
          <div class="flex h-full w-20 items-center justify-center">
            <Logo class="h-10 w-10 text-white" />
          </div>
        </template>
        <template v-slot:content>
          <div class="flex items-end gap-6 px-6">
            <span class="align-bottom font-display text-3xl font-bold"
              >Dielo</span
            >
            <span class="pb-[3px] align-bottom font-body text-2xl font-medium"
              >Author, Dating</span
            >
          </div>
        </template>
      </Navbar>
      <div
        class="flex h-[calc(100%-80px)] w-full items-center justify-between gap-16 pb-20 pl-16 pr-6"
      >
        <div class="flex max-w-lg flex-col gap-16">
          <article class="flex flex-col gap-9">
            <h1 class="text-5xl font-medium">Objavuj detail diela cez audio</h1>
            <span class="text-2xl"
              >Dozveď sa viac o diele v tejto interaktívnej prehliadke a vypočuj
              si jeho príbeh.</span
            >
          </article>
          <div id="start-button" />
        </div>
        <div class="flex h-full w-full items-center justify-center">
          <img
            src="/assets/img/intro_screen.png"
            class="rounded-3xl object-contain max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
    <!-- Hint Idle screen -->
    <div
      class="absolute top-0 z-10 h-full w-full bg-black/60 text-white backdrop-blur-lg"
      v-show="overlay === 'hint'"
    >
      <Navbar class="flex h-20 w-full items-center justify-between">
        <template v-slot:icon class="w-20">
          <div class="flex h-full w-20 items-center justify-center">
            <Logo class="h-10 w-10 text-white" />
          </div>
        </template>
        <template v-slot:content>
          <div class="flex items-end gap-6 px-6">
            <span class="align-bottom font-display text-3xl font-bold"
              >Dielo</span
            >
            <span class="pb-[3px] align-bottom font-body text-2xl font-medium"
              >Author, Dating</span
            >
          </div>
        </template>
      </Navbar>
      <div
        class="flex h-[calc(100%-80px)] w-full items-center justify-between gap-16 pb-20 pl-16 pr-6"
      >
        <div class="flex flex-col gap-16">
          <article class="flex flex-col gap-9">
            <h1 class="text-5xl font-medium">Objavuj detail diela cez audio</h1>
            <span class="text-2xl"
              >Dozveď sa viac o diele v tejto interaktívnej prehliadke a vypočuj
              si jeho príbeh.</span
            >
          </article>
          <div class="flex flex-col gap-6">
            <button
              class="w-full rounded-xl bg-blue-ribbon-600 py-3 text-lg text-white"
              @click="closeHint"
            >
              Pokračuj
            </button>
            <div id="restart-button" />
          </div>
        </div>
        <div class="flex h-full w-full items-center justify-center">
          <img
            src="/assets/img/intro_screen.png"
            class="rounded-3xl object-contain max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
    <div class="h-full w-full" id="micrio-wrapper">
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
                <AudioPlayer
                  v-model="isAudioPlaying"
                  class="pointer-events-auto relative flex w-full flex-col items-center justify-between"
                />
              </template>
            </Annotation>
          </div>
        </TransitionOpacity>
      </ClientOnly>
    </div>
  </div>
</template>
