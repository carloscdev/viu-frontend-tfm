<script setup>
import { ref, reactive } from 'vue';
import ModalBase from '@/components/Base/ModalBase.vue';
import { FileService } from '@/services/file.service';
import { Icon } from '@iconify/vue';
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
import { useStore } from '@/store/';
import { useRoute } from 'vue-router';
import ButtonBase from '@/components/Base/ButtonBase.vue';


const store = useStore();
const route = useRoute();
const fileService = new FileService();

const isLoading = ref(false);
const emits = defineEmits(['close']);

const file = reactive({
  documentId: route.params.documentId,
  name: '',
  file: null,
});

const rules = {
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
    minLength: helpers.withMessage('El nombre debe tener al menos 5 caracteres', minLength(5)),
  },
  file: {
    required: helpers.withMessage('El archivo es requerido', required),
  }
};

const v$ = useVuelidate(rules, file);

const uploadFIle = (event) => {
  const currentFile = event.target.files[0];
  if (validateExtensions(currentFile)) {
    file.file = currentFile;
  } else {
    store.activeAlert('danger', 'El archivo no es válido, por favor seleccione un archivo con extensión válida');
  }
}

const validateExtensions = (currentFile) => {
  const extensions = ['.json','.doc','.xls','.html','.js','.ppt','.css','.sql','.ts','.jpg','.png','.jpeg'];
  const nameFile = currentFile.name.toLowerCase();
  return extensions.some((extension) => nameFile.endsWith(extension));
}

const handleFile = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('name', file.name);
      formData.append('documentId', file.documentId);
      await fileService.createFile(formData);
      store.activeAlert('success', 'Archivo agregado correctamente.');
      emits('close');
    } catch (error) {
      console.log(error);
      store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al agregar el archivo');
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
      <div :class="v$.file.$error ? 'validate-danger' : ''">
        <label for="file">Archivo</label>
        <label class="custom-file-input">
          <input type="file" id="file" @change="uploadFIle" accept=".json,.doc,.xls,.html,.js,.ppt,.css,.sql,.ts,.jpg,.png,.jpeg"/>
          <i class="fa fa-cloud-upload"></i>
          {{ file.file?.name || 'Seleccionar archivo' }}
        </label>
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.file.$errors">
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

<style>
input[type="file"] {
    display: none;
}
.custom-file-input {
  @apply w-full h-10 cursor-pointer border border-dark-light py-2 px-4 rounded;
}
.validate-danger .custom-file-input {
  @apply border-red-600 bg-red-900/10 border-2;
}
</style>