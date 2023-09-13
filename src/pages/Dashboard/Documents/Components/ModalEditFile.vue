<script setup>
import { ref, reactive } from 'vue';
import ModalBase from '@/components/Base/ModalBase.vue';
import { FileService } from '@/services/file.service';
import { Icon } from '@iconify/vue';
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
import { useStore } from '@/store/';
import ButtonBase from '@/components/Base/ButtonBase.vue';

const store = useStore();
const fileService = new FileService();

const isLoading = ref(false);

const props = defineProps({
  fileId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['close']);

const file = reactive({
  name: props.name,
});

const rules = {
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
    minLength: helpers.withMessage('El nombre debe tener al menos 5 caracteres', minLength(5)),
  },
};

const v$ = useVuelidate(rules, file);

const handleFile = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      await fileService.updateFile(props.fileId, { name: file.name });
      store.activeAlert('success', 'Archivo actualizado correctamente.');
      emits('close');
    } catch (error) {
      console.log(error);
      store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al actualizar el nombre del archivo');
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <ModalBase title="Editar nombre del archivo" subtitle="Completa los datos para continuar" @click="emits('close')">
    <form class="grid gap-5" @submit.prevent="handleFile">
      <div :class="v$.name.$error ? 'validate-danger' : ''">
        <label for="name">
          Nombre del archivo
        </label>
        <input type="text" id="name" v-model="file.name" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.name.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div class="grid gap-1">
        <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
          Guardar
          <Icon icon="mdi:content-save-outline" class="text-lg" />
        </ButtonBase>
        <ButtonBase type="button" class="button-light" @click="emits('close')">
          Cancelar
        </ButtonBase>
      </div>
    </form>
  </ModalBase>
</template>
