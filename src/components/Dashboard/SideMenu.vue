<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '@/store';

const store = useStore();
const items = ref([
  {
    icon: 'mdi:home-outline',
    text: 'Inicio',
    to: {
      name: 'public-main'
    }
  },
  {
    icon: 'mdi:view-dashboard-outline',
    text: 'Dashboard',
    to: {
      name: 'home'
    }
  },
  {
    icon: 'mdi:book-open-page-variant-outline',
    text: 'Documentos',
    to: {
      name: 'list-documents'
    }
  },
  {
    icon: 'mdi:cards-heart-outline',
    text: 'Favoritos',
    to: {
      name: 'favorites'
    }
  },
  {
    icon: 'mdi:account-outline',
    text: 'Perfil',
    to: {
      name: 'profile'
    }
  },
]);

</script>

<template>
  <aside class="menu bg-dark-gray py-10 fixed left-0 top-0 w-[100px] min-h-screen">
    <router-link :to="{ name: 'home' }">
      <img src="../../assets/logo-small.png" alt="Logo VIU HUB" width="45" class="mx-auto">
    </router-link>
    <nav class="flex items-center justify-center flex-col mt-12 gap-3">
      <router-link v-for="item of items" :to="item.to" :key="item.text" class="hover:text-primary group">
        <Icon :icon="item.icon" class="text-3xl mx-auto"/>
        <span class="text-dark-light group-hover:text-primary text-xs">{{ item.text }}</span>
      </router-link>
      <router-link :to="{ name: 'categories' }">
        <Icon icon="mdi:format-list-bulleted-type" class="text-3xl mx-auto"/>
        <span class="text-xs">Categorías</span>
      </router-link>
      <router-link :to="{ name: 'users' }">
        <Icon icon="mdi:account-group-outline" class="text-3xl mx-auto"/>
        <span class="text-xs">Usuarios</span>
      </router-link>
      <a class="text-red-600 hover:opacity-80 cursor-pointer text-center" @click="store.logout">
        <Icon icon="mdi:logout" class="text-3xl mx-auto"/>
        <span class="text-xs">Salir</span>
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
