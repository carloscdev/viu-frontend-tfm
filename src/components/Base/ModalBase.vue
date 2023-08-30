<script setup>
import TitleBase from '@/components/Base/TitleBase.vue';

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
</script>

<template>
  <main class="fixed z-40 inset-0 h-screen w-screen flex items-center justify-center bg-dark/90">
    <div class="bg-dark-gray p-5 md:p-10 rounded shadow w-[480px]" @click.stop>
      <TitleBase :title="title" :subtitle="subtitle" />
      <div class="mt-5">
        <slot />
      </div>
    </div>
  </main>
</template>
