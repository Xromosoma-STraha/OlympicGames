<template>
  <div class="form-container">
    <h2>Редактировать профиль</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="firstName">Имя:</label>
        <input type="text" id="firstName" v-model="firstName" required class="text-black" />
      </div>
      <div>
        <label for="lastName">Фамилия:</label>
        <input type="text" id="lastName" v-model="lastName" required class="text-black" />
      </div>
      <div>
        <label for="newPassword">Новый пароль:</label>
        <input type="password" id="newPassword" v-model="newPassword" class="text-black" />
      </div>

         <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
      <div class="buttons-container">
        <button type="submit" class="border rounded-md py-2 px-4 hover:bg-gray-200 transition-colors">
           Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { navigateTo } from '#app';


const authStore = useAuthStore()
const firstName = ref(authStore.firstName);
const lastName = ref(authStore.lastName);
const newPassword = ref('');
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null)

async function updateProfile() {
  isSubmitting.value = true;
    errorMessage.value = null
  try {
    const response = await $fetch('/api/users/update', {
      method: 'POST',
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        newPassword: newPassword.value,
        userId:authStore.userId,
      },
    });
    if (response?.ok) {
      console.log('Профиль обновлен успешно!');
     
     navigateTo('/')
    }
    else {
        errorMessage.value = 'Ошибка при обновлении профиля'
        console.error('Ошибка при обновлении профиля:', response);
    }
  } catch (error: any) {
      errorMessage.value = 'Ошибка при обновлении профиля'
    console.error('Ошибка при обновлении профиля:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
<style scoped>
input.text-black,textarea.text-black,select.text-black {
    color: black;
}
.form-container{
    display: flex;
    flex-direction: column;
   
    margin-top: 50px;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.buttons-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
.border{
    border-width: 2px;
}
.rounded-md{
  border-radius:0.375rem;
}
</style>