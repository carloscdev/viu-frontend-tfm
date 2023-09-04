<script setup>
import { onMounted, ref } from 'vue';
import TitleBase from '@/components/Base/TitleBase.vue';
import { UserService } from '@/services/user.service';
import { useStore } from '@/store/';
import { useRouter } from 'vue-router';
import Empty from '@/components/Dashboard/Empty.vue';
import Loading from '@/components/Dashboard/Loading.vue';

const store = useStore();
const router = useRouter();
const userService = new UserService();
const users = ref([]);
const isLoading = ref(false);

const getUsers = async () => {
  try {
    isLoading.value = true;
    const response = await userService.getUsers();
    users.value = response.data;
    users.value = users.value.map((user) => {
      return {
        ...user,
        isAdmin: user.role === 'ADMIN',
      }
    });
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener los usuarios.');
  } finally {
    isLoading.value = false;
  }
}

const handleActive = async (userId, isActive) => {
  try {
    await userService.updateUser(userId, { isActive });
    store.activeAlert('success', 'Usuario actualizado correctamente.');
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo actualizar el usuario.');
  }
}

const handleRole = async (userId, isAdmin) => {
  try {
    console.log('ok')
    await userService.updateRoleUser(userId, { role: isAdmin ? 'ADMIN' : 'USER' });
    store.activeAlert('success', 'Rol de usuario actualizado correctamente.');
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo actualizar el usuario.');
  }
}

onMounted(async () => {
  if (store.user.role !== 'ADMIN'&& store.isAuth()) {
    store.activeAlert('danger', 'No tienes permisos para acceder a esta página.');
    router.replace({ name: 'home' })
  } else {
    await getUsers();
  }
})
</script>

<template>
  <TitleBase :title="`Lista de usuarios`" subtitle="Visualiza y edita usuarios (Solo para administradores)" />
  <div class="table" v-if="users.length && !isLoading">
    <ul class="table-head grid-cols-[0.1fr,0.6fr,0.5fr,0.3fr,0.3fr]">
      <li>ID</li>
      <li>Nombre</li>
      <li>Email</li>
      <li>Administrador</li>
      <li>Activo</li>
    </ul>
    <ul v-for="user of users" :key="user.userId" class="table-row grid-cols-[0.1fr,0.6fr,0.5fr,0.3fr,0.3fr]" :class="user.role === 'ADMIN' && store.user.userId === user.userId ? 'text-primary opacity-60' : ''">
      <li>
        {{ user.userId }}
      </li>
      <li>
        {{ user.name }}
        ({{ user.isAdmin ? 'Administrador' : 'Usuario' }})
        <span v-if="store.user.userId === user.userId">(Tú)</span>
      </li>
      <li> {{ user.email }}</li>
      <li title="Cambiar rol">
        <label class="switch" :class="user.isAdmin ? 'published' : 'not-published'">
          <input type="checkbox" v-model="user.isAdmin" @change="handleRole(user.userId, user.isAdmin)" :disabled="user.role === 'ADMIN' && store.user.userId === user.userId" />
          <div></div>
        </label>
      </li>
      <li title="Cambiar estado de usuario">
        <label class="switch" :class="user.isActive ? 'published' : 'not-published'">
          <input type="checkbox" v-model="user.isActive" @change="handleActive(user.userId, user.isActive)" :disabled="user.role === 'ADMIN' && store.user.userId === user.userId" />
          <div></div>
        </label>
      </li>
    </ul>
  </div>
  <Empty v-if="!users.length && !isLoading" />
  <Loading v-if="isLoading" />
</template>
