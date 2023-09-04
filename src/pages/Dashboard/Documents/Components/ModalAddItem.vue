<script setup>
import { ref, reactive } from 'vue';
import ModalBase from '@/components/Base/ModalBase.vue';
import { ItemService } from '@/services/item.service';
import { Icon } from '@iconify/vue';
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const store = useStore();
const route = useRoute();
const itemService = new ItemService();

const isLoading = ref(false);

const emits = defineEmits(['close']);

const item = reactive({
  documentId: Number(route.params.documentId),
  content: '',
  position: 1,
});

const rules = {
  content: {
    required: helpers.withMessage('El contenido es requerido', required),
    minLength: helpers.withMessage('El contenido debe tener al menos 10 caracteres', minLength(10)),
  },
};

const v$ = useVuelidate(rules, item);

const handleItem = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      await itemService.createItem(item);
      store.activeAlert('success', 'Contenido agregado correctamente.');
      emits('close');
    } catch (error) {
      console.log(error);
      store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al agregar el contenido');
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <ModalBase title="Agregar contenido" subtitle="Completa los datos para continuar" @click="emits('close')">
    <form class="grid gap-5" @submit.prevent="handleItem">
      <div :class="v$.content.$error ? 'validate-danger' : ''" class="mb-28 sm:mb-24">
        <QuillEditor theme="snow" v-model:content="item.content" contentType="html" toolbar="full" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.content.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div class="grid gap-1">
        <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
          Guardar
          <Icon icon="mdi:content-save-outline" class="text-lg" />
        </ButtonBase>
        <ButtonBase class="button-light" @click="emits('close')">
          Cancelar
        </ButtonBase>
      </div>
    </form>
  </ModalBase>
</template>

<style>
.validate-danger .ql-container.ql-snow,
.validate-danger .ql-toolbar.ql-snow {
  @apply border-red-600;
}
.ql-editor {
  min-height: 300px;
}
</style>