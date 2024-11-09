<template>
  <div class="container my-5">
    <div class="row">
      <!-- Contact Information Section -->
      <div class="col-md-6 contact-section">
        <h4 class="section-title">
          <i class="material-icons">email</i> Thông tin liên hệ
        </h4>
        <div class="mb-3">
          <label for="fullName" class="form-label">Họ và tên</label>
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="state.name"
            placeholder="Họ và tên"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="state.email"
            placeholder="Email"
          />
        </div>
        <div class="form-check terms-check mb-4">
          <input
            class="form-check-input"
            type="checkbox"
            id="acceptTerms"
            v-model="acceptTerms"
          />
          <label class="form-check-label" for="acceptTerms">
            *Bằng cách nhấp vào Thanh toán, bạn sẽ tự động đồng ý với
            <a href="#">Điều khoản dịch vụ</a> và xác nhận rằng điện thoại thông
            minh của bạn hỗ trợ eSIM.
          </label>
        </div>
      </div>

      <!-- Product Summary Section -->
      <div class="col-md-6 summary-section">
        <h4 class="section-title">
          <i class="material-icons">shopping_cart</i> Danh sách sản phẩm
        </h4>
        <div class="summary-header">
          <span>Sản phẩm</span>
          <span>Số lượng</span>
          <span>Giá tiền</span>
        </div>
        <div v-for="item in cartInfo" :key="item.productId" class="product-item">
          <div class="product-details">
            <span>{{ item.productName }}</span>
            <span>{{ item.quantity }}</span>
            <span>{{ item.price }} VND</span>
          </div>
          <hr class="divider"/>
        </div>
        <div class="total-summary">
          <div class="d-flex justify-content-between">
            <span>Tổng tiền</span>
            <span>{{ totalAmount }} VND</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Giảm giá</span>
            <span>- 0 VND</span> <!-- Adjust discount amount if needed -->
          </div>
          <div class="d-flex justify-content-between fw-bold total-payable">
            <span>Tổng tiền thanh toán</span>
            <span>{{ totalAmount }} VND</span>
          </div>
        </div>

        <!-- Payment Method Section -->
        <h4 class="section-title my-4">
          <i class="material-icons">payment</i> Thanh toán
        </h4>
        <div class="payment-options">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="paymentMethod"
              value="credit"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="credit">
              Thẻ tín dụng (Visa/MasterCard)
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="paymentMethod"
              value="Stripe"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="stripe">Stripe</label>
          </div>
          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="radio"
              name="paymentMethod"
              value="qr"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="qr">
              Chuyển khoản qua QR code
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button class="btn btn-primary w-100 mt-3" @click="processPayment">
          Thanh toán đơn hàng
        </button>
      </div>
    </div>
    <div>{{ modelData }}</div>
  </div>
</template>

<script setup>
definePageMeta({
    middleware: 'customer-auth',
});

import { ref, reactive, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const state = reactive({
  name: "",
  email: "",
});
const acceptTerms = ref();
const paymentMethod = ref("Stripe");
const cartInfo = ref([]);

onMounted(() => {
  if (!import.meta.env.SSR) {
    cartStore.refreshLoginInfo();
    cartInfo.value = cartStore.$state.cart_product;
  }
});

const processPayment = async () => {
  if (!acceptTerms.value) {
    alert("Vui lòng nhập đầy đủ thông tin và chấp nhận điều khoản.");
    return;
  }

  const modelData = {
    userName: state.name,
    totalAmount: cartInfo.value.reduce((sum, item) => sum + item.total, 0),
    paymentMethod: paymentMethod.value,
    cartInfo: cartInfo.value,
  };

  const response = await $fetch("https://localhost:7224/api/order-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelData),
  });
  console.log(response);
  if (response.status === 1) {
    window.location.href = response.data;
  }
};
</script>

<style scoped>
.container {
  max-width: 1100px;
}

.section-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 20px;
}

.section-title i {
  font-size: 1.5rem;
  margin-right: 8px;
}

.contact-section, .summary-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.terms-check {
  font-size: 0.9rem;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.product-item {
  margin-bottom: 15px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.divider {
  border-top: 1px dashed #ddd;
}

.total-summary {
  padding-top: 10px;
}

.total-payable {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.payment-options .form-check {
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
}
</style>
