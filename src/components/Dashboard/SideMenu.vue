<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '@/store';

const store = useStore();
const items = ref([
  {
    icon: 'mdi:view-dashboard-outline',
    text: 'Inicio',
    to: '/'
  },
  {
    icon: 'mdi:book-open-page-variant-outline',
    text: 'Wikis',
    to: '/documentos'
  },
  {
    icon: 'mdi:account-outline',
    text: 'Perfil',
    to: '/perfil'
  },
  {
    icon: 'mdi:cards-heart-outline',
    text: 'Favoritos',
    to: '/favoritos'
  },
]);

</script>

<template>
  <aside class="menu bg-dark-gray py-10 fixed left-0 top-0 w-[100px] min-h-screen">
    <router-link to="/">
      <img src="../../assets/logo-small.png" alt="Logo VIU HUB" width="55" class="mx-auto">
    </router-link>
    <nav class="flex items-center justify-center flex-col mt-16 gap-5">
      <router-link v-for="item of items" :to="item.to" :key="item.text" class="hover:text-primary group">
        <Icon :icon="item.icon" class="text-3xl mx-auto"/>
        <span class="text-dark-light group-hover:text-primary">{{ item.text }}</span>
      </router-link>
      <a class="text-red-600 hover:opacity-80 cursor-pointer" @click="store.logout">
        <Icon icon="mdi:logout" class="text-3xl mx-auto"/>
        <span>Salir</span>
      </a>
    </nav>
  </aside>
</template>

<style>
.router-link-active,
.router-link-active span {
  @apply text-primary;
}
.router-link-active.button-light {
  @apply text-dark-light
}
.menu {
  transform: translateX(-100px);
}


@media (min-width: 768px) {
  .menu {
  animation-duration: 1s;
  animation-fill-mode: both;
  opacity: 0;
  animation-name: fadeInLeft;
}
}

@keyframes fadeInLeft {
  0% { transform: translateX(-100px); }
  100% {
    transform: translateX(0);
    opacity: 1
  }
}
</style>
