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

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'handleClick'
])

</script>

<template>
  <aside class="menu bg-dark-gray py-10 fixed z-20 left-0 top-0 w-[100px] min-h-screen ease-in-out duration-300" :class="!isActive ? 'hiddenMenu' : ''">
    <router-link :to="{ name: 'home' }">
      <img src="../../assets/logo-small.png" alt="Logo VIU HUB" width="45" class="mx-auto">
    </router-link>
    <nav class="flex items-center justify-center flex-col mt-12 gap-3">
      <router-link v-for="item of items" :to="item.to" :key="item.text" class="hover:text-primary group">
        <Icon :icon="item.icon" class="text-3xl mx-auto"/>
        <span class="text-dark-light group-hover:text-primary text-xs">{{ item.text }}</span>
      </router-link>
      <router-link :to="{ name: 'categories' }" v-if="store.user.role === 'ADMIN' && store.isAuth()" class="hover:text-primary group">
        <Icon icon="mdi:format-list-bulleted-type" class="text-3xl mx-auto"/>
        <span class="text-dark-light group-hover:text-primary text-xs">Categorías</span>
      </router-link>
      <router-link :to="{ name: 'users' }" v-if="store.user.role === 'ADMIN' && store.isAuth()" class="hover:text-primary group">
        <Icon icon="mdi:account-group-outline" class="text-3xl mx-auto"/>
        <span class="text-dark-light group-hover:text-primary text-xs">Usuarios</span>
      </router-link>
      <a class="text-red-600 hover:opacity-80 cursor-pointer text-center" @click="store.logout">
        <Icon icon="mdi:logout" class="text-3xl mx-auto"/>
        <span class="text-xs">Salir</span>
      </a>
    </nav>
  </aside>
  <div class="fixed z-10 right-5 bottom-5 bg-dark-gray rounded h-12 w-12 flex items-center justify-center hover:text-primary shadow">
    <button @click="emits('handleClick')" class="w-full h-full">
      <Icon :icon="isActive ? 'mdi:menu-open' : 'mdi:menu-close'" class="text-3xl mx-auto text-dark-light hover:cursor-pointer hover:text-primary"/>
    </button>
  </div>
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
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}

.hiddenMenu {
  transform: translateX(-100px) !important;
}

@keyframes fadeInLeft {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(0); }
}
</style>
