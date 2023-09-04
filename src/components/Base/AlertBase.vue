<script setup>
import { computed } from 'vue';
import { useStore } from '@/store/';

const store = useStore();
const type = computed(() => {
  return `alert-${store.alert.type}`
})
</script>

<template>
  <div
    class="alert z-50 fixed bottom-5 left-0 right-0 w-96 max-w-full mx-auto p-5 rounded shadow ease-in-out duration-100"
    :class="type"
  >
    {{ store.alert.message }}
  </div>
</template>

<style>
.alert {
  animation-duration: 4s;
  animation-fill-mode: both;
  opacity: 0;
  animation-name: fadeIn;
}

.alert-danger {
  @apply bg-red-600;
}

.alert-success {
  @apply bg-green-600;
}

.alert-warning {
  @apply bg-yellow-500;
}

@keyframes fadeIn {
  0% { opacity: 0 }
  25%, 50% {
    opacity: 1
  }
  100% {
    opacity: 0;
  }
}
</style>