<template>
  <div class="register-page">
    <h1>Đăng ký tài khoản</h1>
    <form @submit.prevent="submitForm">
      <div >
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required placeholder="Nhập email của bạn" />
      </div>
      <div v-if="emailConfirmed">
        <label for="username">Tên đăng nhập</label>
        <input v-model="username" type="text" id="username" required placeholder="Nhập tên đăng nhập" />
        
        <label for="password">Mật khẩu</label>
        <input v-model="password" type="password" id="password" required placeholder="Nhập mật khẩu" />
      </div>
      <div v-if="message" style="color: red;">{{ message }}</div>
      <button type="submit">
        {{ emailConfirmed ? 'Hoàn tất đăng ký' : 'Gửi email xác nhận' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

definePageMeta({
  layout: "login",
})

const email = ref('')
const username = ref('')
const password = ref('')
const emailConfirmed = ref(false)
const message = ref('')
const router = useRouter()

// Kiểm tra trạng thái xác nhận email khi trang được tải
onMounted(async () => {
  const route = useRoute()
  const token = route.query.token
  email.value = route.query.email
  
  if (token && email.value) {
    try {
      const data = await $fetch(`https://localhost:7224/api/Authentication/ConfirmEmail?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email.value)}`, {
        method: 'GET',
      })
      // Nếu email đã xác nhận thành công
      emailConfirmed.value = true
      message.value = data.message
    } catch (err) {
      message.value = 'Xác nhận email thất bại'
      console.error(err)
    }
  }
})

// Xử lý khi người dùng gửi form
const submitForm = async () => {
  try {
    if (!emailConfirmed.value) {
      // Gửi email xác nhận nếu email chưa được xác nhận
      const data = await $fetch('https://localhost:7224/api/Authentication/RegisterWithEmail', {
        method: 'POST',
        body: { email: email.value }
      })
      message.value = data.message
    } else {
      // Hoàn tất đăng ký khi email đã được xác nhận
      const data = await $fetch('https://localhost:7224/api/Authentication/CompleteRegistration', {
        method: 'POST',
        body: { email: email.value, username: username.value, password: password.value }
      })
      message.value = data.message
      
      router.push('/login')
    }
  } catch (err) {
    message.value = 'Đã xảy ra lỗi. Vui lòng thử lại.'
    console.error(err)
  }
}
</script>

<style scoped>
/* CSS đơn giản cho form */
.register-page {
  max-width: 400px;
  margin: auto;
}
.register-page label {
  display: block;
  margin-bottom: 8px;
}
.register-page input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}
</style>
