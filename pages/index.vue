<template>
  <Loading :show="isLoading" />
  <div class="row">
    <!-- Danh mục sản phẩm -->
    <div class="col-sm-3 section-main">
      <Categoriess />
    </div>

    <!-- Carousel Slider -->
    <div class="col-sm-9 banner-image-container">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <!-- Carousel Items -->
        <div class="carousel-inner">
          <div 
            v-for="(item, index) in notificationDetails" 
            :key="index" 
            :class="['carousel-item', { active: index === 0 }]">
            <img :src="item.imageUrl" class="d-block w-100" alt="Slide Image" />
          </div>
          
        </div>

        <!-- Carousel Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>

  <br />

  <!-- Danh sách sản phẩm -->
  <div class="product-section">
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-sm-2" style="padding-right: 0px;">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Categoriess from '~/components/customer/Categoriess.vue';
import ProductCard from '~/components/customer/ProductCard.vue';
import Loading from '~/components/customer/Loading.vue';
// Khai báo các biến
const products = ref([]);
const notifications = ref([]);
const notificationDetails = ref([]);
const isLoading = ref(true);
// Hàm onMounted
onMounted(async () => {
  try {
    isLoading.value = true;
    products.value = await $fetch("https://localhost:7224/api/product/getall");
    notifications.value = await $fetch('https://localhost:7224/api/notification/getall');
    const promises = notifications.value.map(noti =>
      $fetch("https://localhost:7224/api/notification/getbytitle", {
        params: { title: noti.title }
      })
    );
    notificationDetails.value = await Promise.all(promises);

    console.log('Fetched notifications by title:', notificationDetails.value);
    import('bootstrap').then((bootstrap) => {
      const carouselElement = document.getElementById('carouselExampleIndicators');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: 'carousel'
        });
      }
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.banner-image-container {
  padding: 0;
  height: 390px;
  overflow: hidden;
}

.banner-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
