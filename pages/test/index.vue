<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>
    
    <!-- Hiển thị danh sách sản phẩm trong giỏ hàng -->
    <div v-if="store.cart_info.listProductCart.length > 0">
      <div v-for="(product, index) in store.cart_info.listProductCart" :key="index" class="cart-item">
        <p>{{ product.name }} (x{{ product.quantity }})</p>
        <p>Price: ${{ product.price }}</p>

        <!-- Cập nhật số lượng -->
        <input type="number" v-model.number="product.quantity" @change="updateProductQuantity(product.productId, product.quantity)" />

        <!-- Xóa sản phẩm khỏi giỏ hàng -->
        <button @click="removeFromCart(product.productId)">Remove</button>
      </div>

      <!-- Tổng tiền -->
      <p>Total Money: ${{ store.cart_info.totalMoney }}</p>

      <!-- Mã giảm giá và thanh toán -->
      <input type="text" v-model="discountCode" placeholder="Enter discount code" />
      <button @click="applyDiscountCode">Apply Discount</button>
      <p>Discounted Money: ${{ store.cart_info.paymentMoney }}</p>
    </div>

    <!-- Nếu giỏ hàng trống -->
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { cartStore2 } from "@/store";

// Sử dụng store
const store = cartStore2();
const discountCode = ref(''); // Mã giảm giá người dùng nhập vào

// Khi component được mount, khởi tạo giỏ hàng từ localStorage
onMounted(() => {
  store.initCart();
});

// Xử lý xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (productId) => {
  store.removeFromCart(productId);
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateProductQuantity = (productId, quantity) => {
  store.updateQuantity(productId, quantity);
};

// Áp dụng mã giảm giá
const applyDiscountCode = () => {
  if (discountCode.value) {
    // Ví dụ áp dụng giảm giá 10% với mã "DISCOUNT10"
    if (discountCode.value === 'DISCOUNT10') {
      store.applyDiscount(discountCode.value, 10);
    } else {
      alert('Invalid discount code');
    }
  }
};
</script>

<style scoped>
.cart-container {
  width: 80%;
  margin: 0 auto;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
input[type="number"] {
  width: 50px;
}
</style>
