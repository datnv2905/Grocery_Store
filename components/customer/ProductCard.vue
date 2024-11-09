<template>
  <div class="card">
    <img
      :src="getProductImageUrl(product.imgUrl)"
      alt="product image"
      class="product-image"
    />
    <div class="card-title mx-3">
      <p class="text-truncate-2 mt-3">{{ product.name }}</p>
    </div>
    <div class="product-price">
      <p class="">{{ product.price }} VND</p>
      <NuxtLink :to="`/productdetail/${product.productId}`" class="details-link">
      Xem chi tiết
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);

// Hàm để lấy đường dẫn ảnh từ tên ảnh
const getProductImageUrl = (imageName) => {
  if(imageName){
    return `/img/${imageName}`;
  }else{
    return "";
  }
  // Điều chỉnh URL tùy thuộc vào nơi lưu ảnh
};
</script>

<style scoped>
.text-truncate-2 {
  font-size: 1rem !important;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Change to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px; /* Adjust based on line height */
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover; /* Đảm bảo hình ảnh không bị biến dạng */
}
.card {
  border: 1px solid #e0e0e0;
  border-radius: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: box-shadow 0.3s ease;
  margin-bottom: 10px;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #e16a14; 
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.details-link {
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
  padding: 8px 12px;
  background-color: #e3f2fd;
  border-radius: 6px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px;
}

.product-price {
  color: #ff4d4f;
  font-size: 18px;
  padding: 0px 16px 16px 16px;
}

.product-sold {
  color: #999;
  font-size: 14px;
}
</style>
