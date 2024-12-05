<script setup lang="ts">
import type { Micrio } from "~/components/Micrio.vue";
import Question from "~/assets/img/question.svg?component";
import Navbar from "~/layouts/Navbar.vue";
import TransitionOpacity from "~/components/TransitionOpacity.vue";
import Logo from "~/assets/img/logo.svg?component";
import { SIMILAR_ARTWORKS, TOURS, AUDIO } from "~/data";
const micrio = ref<Micrio["Instance"]>();
const overlay = ref<"intro" | "hint" | null>("intro");
const zoomItem = ref<any>(null);

const { locale } = useI18n();
const { id } = useRoute().params as { id: string };
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

const onNextClick = () => {
  if (!micrio.value?.tour) return;
  micrio.value.tour.controls.next();
  zoomItem.value = null;
};

const onPrevClick = () => {
  if (!micrio.value?.tour) return;
  micrio.value.tour.controls.previous();
  zoomItem.value = null;
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
      class="fixed top-0 z-10 flex h-20 w-full items-center justify-between bg-black/80 text-white"
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
          <span class="align-bottom font-display text-3xl font-bold">{{
            TOURS[id][lang].title
          }}</span>
          <span class="pb-[3px] align-bottom font-body text-2xl font-medium">{{
            TOURS[id][lang].subtitle
          }}</span>
        </div>
      </template>
      <template v-slot:hint>
        <button @click="openHint">
          <Question class="h-10 w-10" />
        </button>
      </template>
    </Navbar>
    <ArtworkOverlay
      :key="zoomItem.id"
      :item="zoomItem"
      v-if="zoomItem"
      @close="zoomItem = null"
    />
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
            <span class="align-bottom font-display text-3xl font-bold">{{
              TOURS[id][lang].title
            }}</span>
          </div>
        </template>
      </Navbar>
      <div
        class="flex h-[calc(100%-80px)] w-full items-center justify-between gap-16 pb-20 pl-16 pr-6"
      >
        <div class="flex max-w-lg flex-col gap-16">
          <article class="flex flex-col gap-9">
            <h1 class="text-5xl font-medium">
              {{ TOURS[id][lang].desc_title }}
            </h1>
            <span class="text-2xl">{{ TOURS[id][lang].desc_subtitle }}</span>
          </article>
          <div id="start-button" />
        </div>
        <div class="flex h-full w-full items-center justify-center">
          <img
            :src="TOURS[id].thumbnailSrc"
            class="max-h-full max-w-full rounded-3xl object-contain"
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
            <span class="align-bottom font-display text-3xl font-bold">{{
              TOURS[id][lang].title
            }}</span>
          </div>
        </template>
      </Navbar>
      <div
        class="z-50 grid h-[calc(100%-80px)] w-full grid-cols-2 gap-8 p-10 pb-20"
      >
        <div class="flex flex-col">
          <span class="text-3xl pb-8 font-bold">{{$t('Vytvorili') }}
          </span>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-8">
              <span class="text-2xl">{{ $t('Slovenská Národná Galéria')}}</span>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Vedenie projektu')}}</div>
                <div>Michal Čudrnák</div>
              </div>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Obsah')}}</div>
                <div>Lukáš Štepánovský</div>
              </div>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Dizajn')}}</div>
                <div>Filip Riusl</div>
              </div>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Vývoj')}}</div>
                <div>František Michal Sebestyén</div>
              </div>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Odborná spolupráca')}}</div>
                <div>
                  Jana Švantnerová, Martin Čičo, Helena Gahérová, Attila Kovács,
                  Eva Hasalová
                </div>
              </div>
              <div class="flex flex-col text-xl">
                <div class="font-bold italic">{{ $t('Preklad')}}</div>
                <div>Isabel Stainsby</div>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="flex flex-col gap-8">
                <span class="text-2xl">Storylab Audio</span>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Produkcia, réžia, scenár')}}</div>
                  <div>Damian Machaj</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Ženský hlas (SK)')}}</div>
                  <div>Miroslava Frankovská</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Mužský hlas (SK)')}}</div>
                  <div>Martin Mňahončák</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Ženský hlas (EN)')}}</div>
                  <div>Jenn Kirk</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Mužský hlas (EN)')}}</div>
                  <div>Mike Ackerman</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Mixing, sound design')}}</div>
                  <div>Petr Čechák</div>
                </div>
                <div class="flex flex-col text-xl">
                  <div class="font-bold italic">{{ $t('Jazykové korekcie (EN)')}}</div>
                  <div>Brian Vondrak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-3xl pb-8">{{ $t('Použité diela') }}</span>
          <ul class="text-lg flex flex-col gap-3">
            <li>{{ $t('Neznámy maliar: Esterházyovský štvorpohreb v Trnave. Po roku 1652, Esterházy Privatstiftung, Eisenstadt, Inv. č. B 467, hrad Forchtenstein. ')}}</li>
            <li>{{ $t('Neznámy maliar: Olejomaľba inscenovaného žánrového výjavu Sultán v Benátkach, podľa predlôh z knihy Nicolasa de Nicolay. Záver 17. storočia, Zbierka SNM – Múzeum Bojnice, Inv. č. XI-2760.')}}</li>
            <li>{{ $t('Nicolas de Nicolay: Les quatre premiers livres des Navigations et Peregrinations Orientales. 1568, Victoria and Albert Museum.')}}</li>
            <li>{{ $t('Elias Widemann: Ladislav Esterházy. 1649.')}}</li>
            <li>{{ $t('Neznámy maliar: Posmrtná podobizeň grófa Ladislava Esterházyho. okolo 1652. Esterhazy Privatstiftung, hrad Forchtenstein.')}}</li>
            <li>{{ $t('Košeľa Ladislava Esterházyho. Polovica 17, storočia, Múzeum úžitkového umenia v Budapešti.')}}</li>
            <li>{{ $t('Johann (Hans) Rudolf Miller – Moritz Lang: Pohrebný sprievod štyroch padlých Esterháziovcov: Ladislava, Františka, Tomáša a Gašpara v bitke pri Vozokanoch v roku 1652 – Vera delineatio pompae finebris Illmi Com. Ladislai Eszterhazi et sociorum cognatorum habitae Tyrnaviae in Ungaria 1652. 26. Novembris. 1653, Lept. ELTE Egyetemi Könyvtár és Levéltár, Budapešť.')}}</li>
            <li>{{ $t('Pohrebná zástava Ladislava Esterházyho. 1652, výšivka s aplikáciami, Burg Forchtenstein.')}}</li>
            <li>{{ $t('Johann (Hans) Rudolf Miller – Moritz Lang : Castrum doloris pri pohrebe štyroch padlých, v bitke pri Vozokanoch padlých Esterházyovcov, v jezuitskom kostole v Trnave. 1652 – 1653, lept. Magyar Nemzeti Múzeum, Budapešť.')}}</li>
            <li>{{ $t('Lucas Schnitzer: Gróf Adam Forgáč. 1630 – 1700, Galéria mesta Bratislavy.')}}</li>
            <li>{{ $t('Jozef Jägr: Veduta Trnavy. 40. roky 18. storočia, Štátny archív v Trnave.')}}</li>
            <li>{{ $t('Johann Daniel Ther Portten: Fasáda trnavského univerzitného kostola sv. Jána Krstiteľa. 1694.')}}</li>
          </ul>
          <div class="flex w-full items-center justify-center mt-auto gap-6 [&>*]:w-full">
            <button
              class="rounded-xl bg-blue-ribbon-600 py-3 text-lg text-white"
              @click="closeHint"
            >
              {{ $t("Pokračuj") }}
            </button>
            <div id="restart-button" />
          </div>
        </div>
      </div>
    </div>
    <div class="h-full w-full" id="micrio-wrapper">
      <ClientOnly>
        <NuxtErrorBoundary @error="onMicrioError">
          <Micrio
            :id="TOURS[id].micrioId"
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
            class="pointer-events-none absolute inset-0 flex items-end justify-end p-4"
          >
            <Annotation
              @onPrevClick="onPrevClick"
              @onNextClick="onNextClick"
              v-show="overlay !== 'hint'"
            >
              <template #header>
                {{ `${(micrio.tour.currentStep ?? 0) + 1 } / ${ (micrio.tour.steps.length)} ${ micrio.marker.title }` }}
              </template>
              <template #body>
                <div
                  class="flex flex-col gap-7 p-4"
                  v-if="
                    micrio.tour.currentStep || micrio.tour.currentStep === 0
                  "
                >
                  <AudioPlayer
                    :audioSrc="AUDIO[id][lang][micrio.tour.currentStep]"
                    v-model="isAudioPlaying"
                    class="pointer-events-auto relative flex w-full flex-col items-center justify-between"
                  />
                  <div
                    v-if="
                      micrio.tour.currentStep &&
                      SIMILAR_ARTWORKS[id][micrio.tour.currentStep] &&
                      SIMILAR_ARTWORKS[id][micrio.tour.currentStep].length
                    "
                    class="pointer-events-auto flex flex-col gap-3"
                  >
                    <span>{{ $t("Súvisiace diela vo výstave") }}</span>
                    <button
                      @click="zoomItem = item"
                      v-for="item in SIMILAR_ARTWORKS[id][
                        micrio.tour.currentStep
                      ]"
                      class="flex h-20 w-full gap-2 overflow-hidden rounded-xl text-sm"
                    >
                      <img
                        class="h-full w-24 shrink-0 rounded-xl bg-white object-cover"
                        :src="`/assets/${item.thumbnailSrc}`"
                      />
                      <div class="flex flex-col justify-center text-left">
                        <div>{{ item[lang].title }}</div>
                        <div>{{ item[lang].subtitle }}</div>
                      </div>
                    </button>
                  </div>
                </div>
              </template>
            </Annotation>
          </div>
        </TransitionOpacity>
      </ClientOnly>
    </div>
  </div>
</template>
