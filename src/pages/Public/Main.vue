<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from '@/store'
import { DocumentService } from '@/services/document.service';
import { CategoryService } from '@/services/category.service';
import { formatSimpleDate } from '@/utils/handleDate';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import LoadingDocument from './Components/LoadingDocument.vue';

const store = useStore()
const documentService = new DocumentService(store)
const categoryService = new CategoryService(store)
const documents = ref([])
const categories = ref([])
const documentsRespaldo = ref([])
const isLoading = ref(true)
const categoryId = ref([])
const search = ref('')

const getPublicDocuments = async () => {
  try {
    const response = await documentService.getPublicDocuments()
    documents.value = response.data
    documentsRespaldo.value = response.data
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error');
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

const getPublicCategories = async () => {
  try {
    const response = await categoryService.getPublicCategories()
    categories.value = response.data
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener las categorías');
  }
}

const filterDocuments = () => {
  if (search.value) {
    documents.value = documentsRespaldo.value.filter(doc => doc.title.toLowerCase().includes(search.value.toLowerCase()))
  } else {
    documents.value = documentsRespaldo.value
  }
  if (categoryId.value.length > 0) {
    documents.value = documents.value.filter(doc => categoryId.value.includes(doc.categoryId))
  }
}

watch(categoryId, () => {
  filterDocuments()
})

onMounted(async () => {
  await getPublicDocuments();
  await getPublicCategories();
});
</script>

<template>
  <section class="fadeUp grid gap-3">
    <div>
      <label for="search">
        Buscar un documento
      </label>
      <input type="search" id="search" v-model="search" @input="filterDocuments">
    </div>
    <div>
      <label>Categorías</label>
      <div class="flex gap-5 mt-2 flex-wrap">
        <label class="content-checkbox" v-for="category of categories">
          {{ category.title }}
          <input type="checkbox" checked="checked" v-model="categoryId" :value="category.categoryId" @change="filterDocuments">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </section>
  <ul class="grid gap-5 fadeUp" v-if="documents && !isLoading">
    <li v-for="doc of documents" class="py-5 border-b border-dark-gray">
      <section class="flex items-center gap-1">
        <Icon icon="mdi:account-circle" class="text-[2.5rem]" />
        <h4>
          <span class="block -mb-2">{{ doc.user.name }}</span>
          <small class="text-dark-light text-sm">Actualizado el: {{ formatSimpleDate(doc.updatedAt) }}</small>
        </h4>
      </section>
      <router-link :to="{ name: 'public-document', params: { slug: doc.slug } }">
        <h3 class="font-bold mt-5 flex items-center justify-between hover:text-primary">
          <span>{{ doc.title }}</span>
          <Icon icon="mdi:arrow-right" class="text-[1.5rem]" />
        </h3>
      </router-link>
      <p class="text-dark-light">{{ doc.description }}</p>
      <small class="border border-dark-gray bg-dark-gray font-bold text-dark-light p-2 rounded-full inline-block mt-5">{{
        doc.category.title }}</small>
    </li>
  </ul>
  <Empty v-if="documents.length === 0 && !isLoading" />
  <LoadingDocument v-if="isLoading" />
</template>

<style>
.content-checkbox {
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;
  @apply rounded;
}

/* Hide the browser's default checkbox */
.content-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  @apply bg-dark-gray border border-dark-light;
}

/* On mouse-over, add a grey background color */
.content-checkbox:hover input~.checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.content-checkbox input:checked~.checkmark {
  background-color: var(--primary);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.content-checkbox input:checked~.checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.content-checkbox .checkmark:after {
  left: 7px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>