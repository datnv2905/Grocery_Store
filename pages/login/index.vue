<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Đăng Nhập</h1>
        <form @submit.prevent="handleLogin" class="border p-4 shadow rounded">
          <div class="mb-3">
            <label for="username" class="form-label">Tên đăng nhập:</label>
            <input
              v-model="loginModel.username"
              type="text"
              class="form-control"
              id="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu:</label>
            <input
              v-model="loginModel.password"
              type="password"
              class="form-control"
              id="password"
              required
            />
          </div>

          <div class="row p-2">
          <div class="col-6">
            <label for="rememberMe">Remember Me</label>
            <input type="checkbox" v-model="rememberMe" />
          </div>
          <div class="col-6 d-flex justify-content-end">
          <NuxtLink to="/forgotpass">Quên mật khẩu?</NuxtLink>
          </div>
          </div>
          
          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
          <ClientOnly>
          <div v-if="!otpSent">
            <button
              type="button"
              class="btn w-100 mt-3"
              @click="handleGoogleLogin"
            >
              <i class="fab fa-google me-2"></i> Đăng nhập với Google
            </button>
          </div>
          </ClientOnly>
        </form>

        <!-- OTP Form -->
        <div v-if="otpSent" class="mt-4">
          <p class="text-center">
            OTP đã gửi tới email bạn đăng ký. Vui lòng nhập OTP:
          </p>
          <form @submit.prevent="handleOTP" class="border p-4 shadow rounded">
            <div class="mb-3">
              <input
                v-model="otpCode"
                type="text"
                class="form-control"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Verify OTP
            </button>
          </form>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { googleTokenLogin } from 'vue3-google-login'
import { useRuntimeConfig } from '#app'

definePageMeta({
  layout: "login",
})

const router = useRouter();
const loginModel = ref({
  username: "",
  password: "",
});
const rememberMe = ref(false);
const otpCode = ref("");
const otpSent = ref(false);

const handleLogin = async () => {
  try {
    const data = await $fetch(
      "https://localhost:7224/api/Authentication/login",
      {
        method: "POST",
        body: JSON.stringify(loginModel.value),
      }
    );

    if (data.status === "Success") {
      otpSent.value = true;
    } else if (data.token) {
      // JWT token đã được trả về -> lưu vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: loginModel.value.username })
      );
      localStorage.setItem("status-login", "2");
      router.push("/"); // chuyển hướng đến trang dashboard
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

const handleOTP = async () => {
  try {
    const data = await $fetch(
      "https://localhost:7224/api/Authentication/login-2Fa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          code: otpCode.value,
          username: loginModel.value.username,
        }),
        credentials: "include",
      }
    );

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: loginModel.value.username }));
      localStorage.setItem("role", JSON.stringify(data.role));
      localStorage.setItem("status-login", "2");
      router.push("/");
    } else {
      alert("Invalid OTP");
    }
  } catch (error) {
    console.error("OTP error:", error);
  }
};


//login with google
const config = useRuntimeConfig()
async function handleGoogleLogin() {
  try {
      console.log("Client ID:", config.public.googleClientId) 
    // Call googleTokenLogin with clientId directly from runtimeConfig
    const response = await googleTokenLogin({
      clientId: config.public.googleClientId, // Access clientId from runtimeConfig
      scope: 'openid email profile',
    })

    console.log('Google login successful:', response)

    // Access the Google token
    const token = response.access_token

    const result = await $fetch('https://localhost:7224/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { token },
  })
  if (result.token) {
      // JWT token đã được trả về -> lưu vào localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify({ username: result.username }));
      localStorage.setItem("status-login", "2");
      router.push("/"); // chuyển hướng đến trang dashboard
    }
    console.log('Server response:', result)
  } catch (error) {
    console.error('Google login failed:', error)
  }
}

</script>

<style scoped>
</style>
