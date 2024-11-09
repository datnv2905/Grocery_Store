<template>
    <div class="register-page">
      <h1 class="">Quên mật khẩu</h1>
      <form @submit.prevent="submitForm">
        <div >
          
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required placeholder="Nhập email của bạn" />
        </div>
        <div v-if="emailConfirmed">
          <label for="newpassword">Mật khẩu mới</label>
          <input v-model="newpassword" type="password" id="newpassword" required placeholder="Nhập mật khẩu mới" />
          
          <label for="confirmPassword">Nhập lại mật khẩu mới</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required placeholder="Nhập lại mật khẩu mới" />
        </div>
        <div v-if="message" style="color: red;">{{ message }}</div>
        <button type="submit">
          {{ emailConfirmed ? 'Đổi mật khẩu' : 'Gửi email xác nhận quên mật khẩu' }}
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
  const newpassword = ref('')
  const confirmPassword = ref('')
  const emailConfirmed = ref(false)
  const message = ref('')
  const router = useRouter()
  const token = ref('')
 
  onMounted(async () => {
    const route = useRoute()
    token.value = route.query.token
    email.value = route.query.email
    
    if (token.value && email.value) {
      try {
        const data = await $fetch(`https://localhost:7224/api/Authentication/confirm-reset-password?token=${encodeURIComponent(token.value)}&email=${encodeURIComponent(email.value)}`, {
          method: 'GET'
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
        const data = await $fetch('https://localhost:7224/api/Authentication/forgot-password', {
          method: 'POST',
          body: { email: email.value }
        })
        message.value = data.message
      } else {
        // Hoàn tất đổi mật khẩu khi email đã được xác nhận
        const data = await $fetch('https://localhost:7224/api/Authentication/reset-password', {
          method: 'POST',
          body: {newpassword: newpassword.value, confirmPassword: confirmPassword.value, email: email.value, token: token.value}
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
  