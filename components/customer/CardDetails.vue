<template>
  <div v-if="product" class="card">
    <div class="row g-4">
      <!-- Phần hình ảnh -->
      <div class="col-md-6">
        <img
          :src="getProductImageUrl(product.imgUrl)"
          alt="product image"
          class="imagefix img-fluid d-block"
        />
      </div>

      <!-- Phần nội dung sản phẩm -->
      <div class="col-md-6">
        <h2 class="display-4 my-3">{{ product.name }}</h2>
        <p class="border-bottom fs-4 my-3 ">{{ product.price }} VND</p>
        <h5 class="pb-2">Product Description</h5>
        <p class="mb-4">{{ product.description }}</p>
        <!-- Phần số lượng sản phẩm -->
        <div class="d-flex align-items-center mb-4">
          <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
          <input type="number" class="form-control mx-2 text-center" style="width: 100px;" v-model="quantity" />
          <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
        </div>

        <div class="d-flex">
        <button class="btn btn-primary d-flex align-items-center" @click="addToCart">
          <i class="material-icons me-2">add_shopping_cart</i>
          <span>Thêm vào giỏ hàng</span>
        </button>
        <button class="btn btn-primary align-items-center mua" @click="paymenNow()">Mua ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'nuxt/app' 
const { product } = defineProps(["product"]);
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const router = useRouter()
//cách 2 lưu giỏ hàng có mã giảm giá chưa biết xử lý thanh toán có mã giảm giá
// import { cartStore2 } from "@/store";
// const cartStore = cartStore2();

// Hàm để lấy đường dẫn ảnh từ tên ảnh
const getProductImageUrl = (imageName) => {
  if (imageName) {
    return `/img/${imageName}`;
  } else {
    return "";
  } 
};

const quantity = ref(1);
// Hàm tăng số lượng
const increaseQuantity = () => {
  if(quantity.value < 99){
    quantity.value++;
  }
};

// Hàm giảm số lượng, đảm bảo không giảm dưới 1
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Hàm thêm vào giỏ hàng
const addToCart = () => {
  cartStore.addToCart(product, quantity.value);
};

const cart_product = ref([]);

function paymenNow(){
  var item = {
    productId : product.productId,
    productName : product.name,
    price : product.price,
    quantity : quantity.value,
    total : product.price * quantity.value,
    categoryName : product.categoryName,
  };
  console.log(item);
  cart_product.value.push(item);
  cartStore.updateCart_Product(cart_product.value);
  router.push('/payment/only_product');
}
</script>

<style scoped>
.imagefix {
  width: 500px; 
  height: 500px; 
  object-fit: cover; /* Giữ nguyên tỷ lệ và cắt nếu cần */
}
.mua{
  margin-left: 30px;
  min-width: 150px;
}

</style>
