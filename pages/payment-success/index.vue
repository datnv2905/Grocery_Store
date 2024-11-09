<template>
  <div class="payment-success-container">
    <div class="success-card">
      <div class="icon-container">
        <i class="material-icons success-icon">check_circle</i>
      </div>
      <h1 class="success-title">Thanh toán thành công!</h1>
      <p class="order-info">Mã đơn hàng của bạn: <span class="order-id">{{ orderId }}</span></p>
      <p class="success-message">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi! Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
      </p>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <router-link to="/" class="btn btn-primary">Quay lại trang chủ</router-link>
        <router-link to="/orders" class="btn btn-outline-secondary">Xem đơn hàng của bạn</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.query.orderId;
</script>

<style scoped>
.payment-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.success-card {
  max-width: 500px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.success-icon {
  font-size: 60px;
  color: #28a745; /* Success green color */
}

.success-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.order-info {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
}

.order-id {
  font-weight: bold;
  color: #333;
}

.success-message {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 25px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline-secondary {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #ced4da;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-secondary:hover {
  background-color: #e2e6ea;
  color: #5a6268;
}
</style>
