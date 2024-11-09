<template>
  <div v-if="cart.length > 0">
    <div class="container mt-2 row">
      <h4>Thông tin giỏ hàng</h4>
      <div class="col-8 table-responsive">
      <div class="card card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Mã sp</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Giá tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.productId">
              <td>
                <input
                  type="checkbox"
                  v-model="selectedItems"
                  :value="item"
                  @change="updateSelectedTotal"
                />
              </td>
              <td>{{ item.productId }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.price }} VND</td>
              <td>
                <div class="d-flex align-items-center">
                  <button
                    class="btn btn-outline-secondary"
                    @click="decreaseQuantity(item)"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    class="form-control mx-2 text-center"
                    style="width: 60px"
                    v-model="item.quantity"
                    @input="updateQuantity(item)"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    @click="increaseQuantity(item)"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{{ item.price * item.quantity }} VND</td>
              <td>
                <button class="bt" @click="removeFromCart(item.productId)">
                  <i class="fas fa-trash-alt"></i>
                </button> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div class="col-md-6">
          <NuxtLink to="/" class="btn btn-primary">Tiếp tục mua sắm</NuxtLink>
        </div>
      </div>

      <div class="col-4 row">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sản phẩm đã chọn</h5>
            <div class="d-flex row" v-for="item in selectedItems" :key="item.productId">
              <div class="col-7">
                {{ item.productName }}
              </div>
              <div class="col-5 cost">
                {{ item.price * item.quantity }} VNĐ
              </div>
            </div>
            <br>
            <div class="d-flex row">
              <div class="col-7">
                <div>Giảm giá:</div>
                <div>Tổng số tiền thanh toán:</div>
              </div>
              <div class="col-5 cost">
                <div>0 VNĐ</div>
                <div> {{ selectedTotal }} VNĐ</div>
              </div>
            </div>
            <br>
            <button class="btn btn-primary w-100" @click="paymentFunction()"><i class="fa-regular fa-credit-card"></i> Tiến hành thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="container my-5">
    <h2>Giỏ hàng của bạn đang trống...</h2>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from 'nuxt/app' 
const router = useRouter();
// Sử dụng store
const cartStore = useCartStore();
const selectedItems = ref([]); // Danh sách các sản phẩm đã chọn

onMounted(() => {
  cartStore.initCart(); // Khởi tạo giỏ hàng từ localStorage khi trang được tải

  // Lấy selectedItems từ localStorage nếu có
  const storedSelectedItems = JSON.parse(localStorage.getItem("cart_product_Temp"));
  if (storedSelectedItems) {
    selectedItems.value = storedSelectedItems;
  }
});

// Lấy giỏ hàng từ store
const cart = computed(() => cartStore.cart);

// Tính tổng giá trị của các sản phẩm đã chọn
const selectedTotal = computed(() => {
  return selectedItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.productId, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.productId, item.quantity - 1);
  }
};

// Hàm cập nhật số lượng sản phẩm
const updateQuantity = (item) => {
  if (item.quantity < 1) {
    cartStore.removeFromCart(item.productId);
  } else {
    cartStore.updateQuantity(item.productId, item.quantity);
  }
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart_Temp(productId);
  cartStore.removeFromCart(productId);
};

//cập nhật danh sách sản phẩm đã chọn trong cart_product_Temp
const updateSelectedTotal = () => {
  selectedItems.value = selectedItems.value.filter(item => cart.value.includes(item));
};

// Watcher để lưu selectedItems vào cart_product_Temp trong Pinia và localStorage mỗi khi thay đổi
watch(selectedItems, (newItems) => {
  // Cập nhật cart_product_Temp với danh sách sản phẩm đã chọn
  cartStore.updateCart_Product_Temp(newItems);
}, { deep: true });

function paymentFunction() {
  if (selectedItems.value.length < 1) {
    store.SetNotification("Chưa có sản phẩm nào để thanh toán", "-1");
    return;
  } else {
    router.push('/payment/cart_product');
  }
};
</script>


<style scoped>
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}

input[type="number"] {
  text-align: center;
}
.cost{
  text-align: end;
}
.bt{
  border: white;
  background-color: white;
}
</style>