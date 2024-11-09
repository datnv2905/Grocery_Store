<template>
  <div class="error-page text-center p-10">
    <p class="status-code">{{ error.statusCode }}</p>
    <p class="oops-text mt-3">Ooops.</p>
    <p class="error-message">{{ error.message || "Something went wrong!" }}</p>
    <button class="home-btn btn" @click="handleClearError">Go Home</button>
  </div>
</template>

<script setup>
definePageMeta({
    layout: false,
  });
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.error-page {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 40px 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.status-code {
  font-size: 6rem;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.oops-text {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.home-btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3490dc;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.home-btn:hover {
  background-color: #2779bd;
}
</style>
