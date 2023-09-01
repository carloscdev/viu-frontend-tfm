<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <nav class="h-20 bg-dark-gray flex items-center justify-between px-10">
    <img class="w-25" src="@/assets/logo.png" alt="LOGO VIU HUB">
    <ul class="text-lg">
      <li>
        <router-link to="/usuario/inicio-sesion" class="flex items-center gap-2 hover:text-primary font-bold">
          Inicia Sesión
          <Icon icon="mdi:login" class="text-xl"/>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
