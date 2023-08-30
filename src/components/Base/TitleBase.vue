<script setup>
defineProps(['title', 'subtitle'])
</script>

<template>
<div>
  <h1 class="font-bold text-3xl">
    {{ title }}
  </h1>
  <small class="text-dark-light text-sm">{{ subtitle }}</small>
</div>
</template>
