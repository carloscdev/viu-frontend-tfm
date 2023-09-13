<script setup>
import EditDocument from './Components/EditDocument.vue';
import TitleBase from '@/components/Base/TitleBase.vue';
import ItemList from './Components/ItemList.vue';
import FileList from './Components/FileList.vue';
</script>

<template>
  <TitleBase :title="`Configura tu documento`" subtitle="Agrega, edita y publica tu documento" />
  <EditDocument />
  <FileList />
  <ItemList />
</template>