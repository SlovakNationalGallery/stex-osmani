<template>
  <Transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition-all duration-200 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-all duration-100 ease-in"
  >
    <slot></slot>
  </Transition>
</template>
