<script setup>
import { ref, reactive, onMounted } from 'vue';
import TitleBase from '@/components/Base/TitleBase.vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';
import { useStore } from '@/store/';
import { useRouter, useRoute } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { DocumentService } from '@/services/document.service';
import { CategoryService } from '@/services/category.service';

const store = useStore();
const route = useRoute();
const router = useRouter();

const documentService = new DocumentService();
const categoryService = new CategoryService();

const isLoading = ref(false);

const categories = ref([]);
const document = reactive({
  categoryId: null,
  title: '',
  description: '',
  isPublished: true,
})

// const item = reactive({
//   documentId: route.params.documentId,
//   content: '',
//   position: 1,
// })
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

const getDocumentById = async () => {
  try {
    const response = await documentService.getDocumentById(route.params.documentId);
    document['categoryId'] = response.data.categoryId;
    document['title'] = response.data.title;
    document['description'] = response.data.description;
    document['isPublished'] = response.data.isPublished;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener el documento.');
  }
}

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
      const response = await documentService.updateDocument(route.params.documentId, document);
      store.activeAlert('success', 'Documento actualizado correctamente.');
      document['categoryId'] = response.data.categoryId;
      document['title'] = response.data.title;
      document['description'] = response.data.description;
      document['isPublished'] = response.data.isPublished;
    } catch (error) {
      store.activeAlert('danger', error?.response?.data?.message);
    } finally {
      isLoading.value = false;
    }
  }
}

const handleDelete = () => {
  console.log('Eliminar')
}

onMounted(async () => {
  await getDocumentById();
  await getCategories();
})
</script>

<template>
  <TitleBase :title="`Configura tu documento`" subtitle="Agrega, edita y publica tu documento" />
  <form class="grid gap-5" @submit.prevent="handleDocument">
    <hr>
    <h2 class="text-2xl font-bold">Documento</h2>
    <div class="-mb-2">
      <label>
        Publicado
      </label>
      <label class="switch" :class="document.isPublished ? 'published' : 'not-published'">
        <input type="checkbox" v-model="document.isPublished" />
        <div></div>
      </label>
    </div>
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
    <div class="grid gap-3">
      <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
        Guardar
        <Icon icon="mdi:file-sign" class="text-lg" />
      </ButtonBase>
      <ButtonBase type="button" :isLoading="isLoading" class="button-danger" @click="handleDelete">
        Eliminar
        <Icon icon="mdi:delete" class="text-lg" />
      </ButtonBase>
      <router-link class="button button-light text-dark-light" :to="{ name: 'list-documents' }">
        Regresar
      </router-link>
    </div>
    <hr>
  </form>
  <div>
    <h2 class="text-2xl font-bold">Contenido</h2>
  </div>
  <!-- <form class="grid gap-5" @submit.prevent="handleLogin">
    <div :class="v$.content.$error ? 'validate-danger' : ''">
      <label for="content">
        Contenido
      </label>
      <QuillEditor theme="snow" v-model:content="item.content" contentType="html" toolbar="full" />
      <div class="text-red-600 text-sm">
        <small v-for="error of v$.content.$errors">
          {{ error.$message }}
        </small>
      </div>
    </div>
    <div class="grid sm:flex-col gap-1 mt-20">
      <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
        Iniciar Sesión
        <Icon icon="mdi:account-lock-open" class="text-lg"/>
      </ButtonBase>
      <router-link class="button button-light" to="/usuario/registro">
        ¿No tienes una cuenta?
      </router-link>
    </div>
  </form> -->
</template>
<style scoped>
.switch.published {
  @apply bg-primary;
}
.switch.not-published {
  @apply bg-dark-light;
}
.switch input {
  position: absolute;
  opacity: 0;
}

.switch {
  display: inline-block;
  height: 35px;
  width: 65px;
  border-radius: 2rem;
  display: flex;
  align-items: center;
}

.switch div {
  margin-left: 5px;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  background: #FFF;
  transition: all 300ms;
}

.switch input:checked+div {
  transform: translate3d(100%, 0, 0);
}
</style>