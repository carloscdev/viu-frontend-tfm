<script setup>
import { Icon } from '@iconify/vue';
import { useStore } from '@/store';

const store = useStore();

</script>

<template>
  <nav class="h-20 bg-dark-gray flex items-center justify-center md:justify-between px-10">
    <router-link :to="{ name: 'public-main' }">
      <img width="120" src="@/assets/logo.png" alt="LOGO VIU HUB">
    </router-link>
    <ul class="text-lmd gap-5 hidden md:flex">
      <li class="text-dark-light">
        <router-link :to="{ name: 'public-main' }" class="flex items-center gap-2 hover:text-primary font-bold">
          Inicio
          <Icon icon="mdi:home-outline" class="text-xl"/>
        </router-link>
      </li>
      <li v-if="!store.isAuth()">
        <router-link to="/usuario/inicio-sesion" class="flex items-center gap-2 hover:text-primary font-bold text-dark-light">
          Inicia Sesión
          <Icon icon="mdi:login" class="text-xl"/>
        </router-link>
      </li>
      <template v-else>
        <li>
          <router-link :to="{ name: 'home' }" class="flex items-center gap-2 text-dark-light hover:text-primary font-bold">
            Dashboard
            <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
          </router-link>
        </li>
        <li class="text-red-600 font-bold cursor-pointer">
          <a @click="store.logout" class="flex items-center gap-2">
            Cerrar Sesión
            <Icon icon="mdi:logout" class="text-xl"/>
          </a>
        </li>
      </template>
    </ul>
  </nav>
  <aside class="md:hidden fixed bottom-0 left-0 w-screen h-16 bg-dark-gray z-40 block px-10">
    <ul class="text-lg items-center gap-5 flex justify-evenly h-full">
      <li class="text-dark-light">
        <router-link :to="{ name: 'public-main' }" class="flex items-center gap-2 hover:text-primary font-bold">
          <Icon icon="mdi:home-outline" class="text-3xl"/>
        </router-link>
      </li>
      <li v-if="!store.isAuth()">
        <router-link to="/usuario/inicio-sesion" class="flex items-center gap-2 hover:text-primary font-bold text-dark-light">
          <Icon icon="mdi:login" class="text-3xl"/>
        </router-link>
      </li>
      <template v-else>
        <li>
          <router-link :to="{ name: 'home' }" class="flex items-center gap-2 text-dark-light hover:text-primary font-bold">
            <Icon icon="mdi:view-dashboard-outline" class="text-3xl"/>
          </router-link>
        </li>
        <li class="text-red-600 font-bold cursor-pointer">
          <a @click="store.logout" class="flex items-center gap-2">
            <Icon icon="mdi:logout" class="text-3xl"/>
          </a>
        </li>
      </template>
    </ul>
  </aside>
</template>

<style>
.router-link-active,
.router-link-active {
  @apply text-primary;
}
</style>
