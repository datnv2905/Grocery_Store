<template>
  <div class="container my-1">
    <div class="row">
      <!-- Contact Information Section -->
      <div class="col-md-6">
        <h4 class="mb-4">
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
        <div class="form-check mb-4">
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
      <div class="col-md-6">
        <h4 class="mb-4">
          <i class="material-icons">shopping_cart</i> Danh sách sản phẩm
        </h4>
        <table class="table">
          <thead>
            <tr>
              <th style="width: 50%">Sản phẩm</th>
              <th style="width: 25%; text-align: center">Số lượng</th>
              <th style="width: 25%; text-align: right">Giá tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartInfo" :key="item.productId">
              <td>{{ item.productName }}</td>
              <td style="text-align: center">{{ item.quantity }}</td>
              <td style="text-align: right">{{ item.price }}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <!-- Summary -->
          <div class="d-flex justify-content-between">
            <span>Tổng tiền</span>
            <span>{{ modelData.totalAmount }} VND</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Giảm giá</span>
          </div>
          <div class="d-flex justify-content-between fw-bold">
            <span>Tổng tiền thanh toán</span>
            <span>{{ modelData.totalAmount }} VND</span>
          </div>
        </div>
        <!-- Payment Method Section -->
        <h4 class="my-4"><i class="material-icons">payment</i> Thanh toán</h4>
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
            value="stripe"
            v-model="paymentMethod"
          />
          <label class="form-check-label" for="stripe"> Stripe </label>
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

        <!-- Submit Button -->
        <button class="btn btn-primary w-100" @click="processPayment">
          Thanh toán đơn hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
    middleware: 'customer-auth',
});
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const state = reactive({
  name: "",
  email: "",
});
const token = localStorage.getItem("token");
const acceptTerms = ref();
const paymentMethod = ref("Stripe");
// const cartInfo1 = ref({});
const cartInfo = ref([]);
const amount = computed(() => {
  return cartInfo.value.reduce((sum, item) => sum + item.total, 0);
});

onMounted(() => {
  if (!import.meta.env.SSR) {
    cartStore.refreshLoginInfo();
  }
  const savedCart = localStorage.getItem("cart_product_Temp");
  if (savedCart) {
    cartInfo.value = JSON.parse(savedCart);
  }
});
const modelData = reactive({
  userName: state.name,
  totalAmount: amount,
  paymentMethod: paymentMethod.value,
  cartInfo: cartInfo,
});
watch(
  () => state.name,
  (newName) => {
    modelData.userName = newName;
  }
);
const processPayment = async () => {
  if (!acceptTerms.value) {
    alert("Vui lòng nhập đầy đủ thông tin và chấp nhận điều khoản.");
    return;
  }
  const response = await $fetch("https://localhost:7224/api/order-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modelData),
  });
  console.log(response);
  if (response.status == 1) {
    // Redirect the user to the Stripe payment link
    window.location.href = response.data;
  }
};
</script>

<style scoped>
/* Container Styling */
.container {
  max-width: 1100px;
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Section Titles */
h4 {
  color: #343a40;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

h4 i.material-icons {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  color: #007bff;
}

/* Labels */
.form-label {
  color: #495057;
  font-weight: 500;
}

/* Form Controls */
.form-control {
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.2);
}

/* Checkbox and Links */
.form-check-label {
  color: #495057;
  font-size: 0.9rem;
}

.form-check-label a {
  color: #007bff;
  text-decoration: none;
}

.form-check-label a:hover {
  text-decoration: underline;
}

/* Product List Styling */
.d-flex.justify-content-between span {
  font-weight: 500;
  color: #6c757d;
}

.d-flex.justify-content-between.fw-bold {
  color: #343a40;
}

.align-items-center span {
  color: #495057;
  font-weight: 600;
}

/* Button Styling */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  h4 {
    font-size: 1.25rem;
  }
}
</style>
