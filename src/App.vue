<script setup>
import { RouterView, useRoute } from 'vue-router';
import { useStore } from './store';

const store = useStore();
const route = useRoute();

import AlertBase from '@/components/Base/AlertBase.vue';
</script>

<template>
  <component :is="route?.meta?.layout || 'div'">
    <RouterView />
  </component>
  <AlertBase v-if="store.alert.isActive" />
</template>
