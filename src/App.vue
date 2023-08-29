<script setup>
import { RouterView } from 'vue-router';
import { useStore } from '@/store/';

import AlertBase from '@/components/Base/AlertBase.vue';

const store = useStore();
</script>

<template>
  <RouterView />
  <AlertBase v-if="store.alert.isActive" />
</template>
