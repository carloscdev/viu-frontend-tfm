<script setup>
import { ref, reactive, onMounted } from 'vue';
import ModalBase from '@/components/Base/ModalBase.vue';
import { CategoryService } from '@/services/category.service';
import { Icon } from '@iconify/vue';
import { required, minLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
import { useStore } from '@/store/';
import ButtonBase from '@/components/Base/ButtonBase.vue';

const store = useStore();
const categoryService = new CategoryService();

const isLoading = ref(false);

const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(['close', 'updated']);

const category = reactive({
  title: '',
});

const rules = {
  title: {
    required: helpers.withMessage('El título es requerido', required),
    minLengthValue: helpers.withMessage('El título debe tener al menos 3 caracteres', minLength(3))
  },
};

const v$ = useVuelidate(rules, category);

const handleCategory = async () => {
  try {
    const response = await categoryService.updateCategory(props.categoryId, { title: category.title });
    store.activeAlert('success', 'Categoría creada correctamente.');
    emits('updated', response.data);
  } catch (error) {
    console.log('errror', error)
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo crear la categoría.');
  }
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await categoryService.getCategoryById(props.categoryId);
    category.title = response.data.title;
  } catch (error) {
    console.log('errror', error)
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener la categoría.');
  } finally {
    isLoading.value = false;
  }
})

</script>

<template>
  <ModalBase title="Actualizar categoría" subtitle="Completa los datos para continuar" @click="emits('close')">
    <form class="grid gap-5" @submit.prevent="handleCategory">
      <div :class="v$.title.$error ? 'validate-danger' : ''">
        <label for="text">
          Título
        </label>
        <input type="text" id="text" v-model="category.title" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.title.$errors">
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
