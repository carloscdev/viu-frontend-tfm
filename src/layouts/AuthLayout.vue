<script setup>
import { onMounted } from 'vue';
import{ useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
  if (store.isAuth()) {
    router.replace({ name: 'home' })
  }
})
</script>

<template>
  <main class="w-screen h-screen flex items-center justify-center">
    <section class="w-[95%] max-w-[480px] mx-auto">
      <img class="mb-5 w-25 mx-auto" src="../assets/logo.png" alt="LOGO VIU HUB">
      <slot />
    </section>
  </main>
</template>
