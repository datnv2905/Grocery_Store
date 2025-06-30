<template>
  <div>
    <h1>Thông báo khuyến mãi</h1>
    <form @submit.prevent="sendPromotion">
      <div>
        <label for="title">Tiêu đề</label>
        <input v-model="title" id="title" placeholder="Nhập tiêu đề thông báo" required />
      </div>
      <div>
        <label for="body">Nội dung</label>
        <textarea v-model="body" id="body" placeholder="Nhập nội dung thông báo" required></textarea>
      </div>
      <button type="submit">Gửi Thông Báo</button>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const nuxtApp = useNuxtApp();
const title = ref('');
const body = ref('');
const typeNoti = ref('1');
const responseMessage = ref('');

const sendPromotion = async () => {
  try {
    const response = await $fetch('https://localhost:7224/api/firebase/send', {
      method: 'POST',
      body: {
        title: title.value,
        body: body.value,
        typeNoti : 1
      }
    });
    responseMessage.value = 'Thông báo khuyến mãi đã được gửi thành công!';
    console.log('Promotion sent:', response);
  } catch (error) {
    responseMessage.value = 'Có lỗi xảy ra khi gửi thông báo.';
    console.error('Error sending promotion:', error);
  }
};

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 1rem;
  font-size: 1rem;
  color: green;
}
</style>
