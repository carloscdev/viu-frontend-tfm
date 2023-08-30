<script setup>
import { onMounted, ref, reactive } from 'vue';
import ModalBase from '@/components/Base/ModalBase.vue';
import { CategoryService } from '@/services/category.service';
import { DocumentService } from '@/services/document.service';
import { Icon } from '@iconify/vue';
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/';
import ButtonBase from '@/components/Base/ButtonBase.vue';

const store = useStore();
const router = useRouter();
const documentService = new DocumentService();
const categoryService = new CategoryService();

const categories = ref([]);
const isLoading = ref(false);

const emits = defineEmits(['close']);

const document = reactive({
  categoryId: null,
  title: '',
  description: '',
  isPublished: true,
});

const rules = {
  categoryId: {
    required: helpers.withMessage('La categoría es requerida', required),
  },
  title: {
    required: helpers.withMessage('El título es requerido', required),
    minLengthValue: helpers.withMessage('El título debe tener al menos 8 caracteres', minLength(8))
  },
  description: {
    required: helpers.withMessage('La descripción es requerida', required),
    minLengthValue: helpers.withMessage('El título debe tener al menos 20 caracteres', minLength(20))
  },
};

const v$ = useVuelidate(rules, document);

const getCategories = async () => {
  try {
    const response = await categoryService.getCategories();
    categories.value = response.data;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener las categorías.');
  }
}

const handleDocument = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const response = await documentService.createDocument(document);
      store.activeAlert('success', 'Documento creado correctamente.');
      router.replace({ name: 'add-items', params: { documentId: response.data.documentId } })
    } catch (error) {
      store.activeAlert('danger', error?.response?.data?.message);
    } finally {
      isLoading.value = false;
    }
  }
}

onMounted(async() => {
  await getCategories();
})
</script>

<template>
  <ModalBase title="Crear documento" subtitle="Completa los datos para continuar" @click="emits('close')">
    <form class="grid gap-5" @submit.prevent="handleDocument">
      <div :class="v$.categoryId.$error ? 'validate-danger' : ''">
        <label for="categoryId">
          Categoría
        </label>
        <select name="categoryId" id="categoryId" v-model="document.categoryId">
          <option :value="null">Selecciona una categoría</option>
          <option v-for="category of categories" :key="category.categoryId" :value="category.categoryId">
            {{ category.title }}
          </option>
        </select>
        <div class="text-red-600 text-sm">
          <small v-for="error of v$.categoryId.$errors">
            {{ error.$message }}
          </small>
        </div>
      </div>
      <div :class="v$.title.$error ? 'validate-danger' : ''">
        <label for="text">
          Title
        </label>
        <input type="text" id="text" v-model="document.title" />
        <div class="text-red-600 text-sm">
          <small v-for="error of v$.title.$errors">
            {{ error.$message }}
          </small>
        </div>
      </div>
      <div :class="v$.description.$error ? 'validate-danger' : ''">
        <label for="description">
          Descripción
        </label>
        <textarea id="description" v-model="document.description"></textarea>
        <div class="text-red-600 text-sm">
          <small v-for="error of v$.description.$errors">
            {{ error.$message }}
          </small>
        </div>
      </div>
      <div class="grid gap-1">
        <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
          Continuar
          <Icon icon="mdi:file-sign" class="text-lg" />
        </ButtonBase>
        <ButtonBase class="button-light" @click="emits('close')">
          Cancelar
        </ButtonBase>
      </div>
    </form>
  </ModalBase>
</template>

<style scoped>

</style>