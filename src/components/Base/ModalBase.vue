<script setup>
import TitleBase from '@/components/Base/TitleBase.vue';
import { onMounted, onUnmounted } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  document.body.classList.add('overflow-hidden');
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
})
</script>

<template>
  <main class="fixed z-40 inset-0 h-screen w-screen flex items-center justify-center bg-dark/90">
    <div class="bg-dark-gray px-3 sm:px-5 py-10 md:p-10 rounded shadow w-[620px] max-h-screen overflow-y-auto" @click.stop>
      <TitleBase :title="title" :subtitle="subtitle" />
      <div class="mt-5">
        <slot />
      </div>
    </div>
  </main>
</template>
