<script setup>
defineProps(['type', 'isLoading'])
</script>

<template>
  <button :type="type" :disabled="isLoading">
    <slot v-if="!isLoading" />
    <span v-else class="loader"></span>
  </button>
</template>

<style>
.loader {
  width: 20px;
  height: 20px;
  border: 5px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>