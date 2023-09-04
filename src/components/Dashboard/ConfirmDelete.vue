<script setup lang="ts">
import ModalBase from '../Base/ModalBase.vue';
import ButtonBase from '../Base/ButtonBase.vue';
import { Icon } from '@iconify/vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['close', 'confirm']);
</script>

<template>
  <ModalBase :title="title" :subtitle="subtitle" @click="emits('close')">
    <div class="flex flex-col sm:flex-row justify-end border-t border-dark-light pt-5 gap-3">
      <ButtonBase class="button-danger" @click="emits('confirm')">
        Eliminar
        <Icon icon="mdi:delete-outline" class="text-lg" />
      </ButtonBase>
      <ButtonBase class="button-dark" color="light" @click="emits('close')">Cancelar</ButtonBase>
    </div>
  </ModalBase>
</template>
