<script setup>
import { Icon } from '@iconify/vue';
defineProps({
  files: {
    type: Array,
    required: true
  }
})

const getExtensionFile = (url) => {
  const extension = url.split('.').pop();
  return extension;
}
</script>

<template>
  <section class="border-t border-dark-gray py-10 fadeUp">
    <h1>Archivos Adjuntos</h1>
    <ul class="flex gap-3 mt-5 flew-wrap">
      <li v-for="file of files">
        <a :href="file.url" target="_blank" class="block border p-5 rounded border-dark-gray w-24 text-center hover:bg-dark-gray">
          <Icon icon="mdi:file-outline" class="text-2xl text-dark-light mx-auto" />
          <small class="text-dark-light">{{ file.name }}.{{ getExtensionFile(file.url) }}</small>
        </a>
      </li>
    </ul>
    </section>
</template>
