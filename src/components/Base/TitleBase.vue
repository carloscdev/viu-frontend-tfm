<script setup>
defineProps(['title', 'subtitle'])
</script>

<template>
<div>
  <h1>
    {{ title }}
  </h1>
  <small class="text-dark-light text-sm">{{ subtitle }}</small>
</div>
</template>
