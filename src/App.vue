<script setup>
import { onUpdated } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useStore } from './store';

const store = useStore();
const route = useRoute();

import AlertBase from '@/components/Base/AlertBase.vue';

onUpdated(() => {
  window.scrollTo(0,0);
})
</script>

<template>
  <component :is="route?.meta?.layout || 'div'">
    <RouterView />
  </component>
  <AlertBase v-if="store.alert.isActive" />
</template>
