<template>
  <div
    class="flex h-20 w-full items-center justify-between border-b-3 border-black bg-white"
  >
    <div class="flex h-full items-center">
      <slot name="icon" />
      <slot name="content" />
    </div>
    <div class="flex gap-4">
      <slot name="hint" />
      <LanguageSwitcher class="flex gap-4 pr-10 font-display text-3xl" />
    </div>
  </div>
</template>