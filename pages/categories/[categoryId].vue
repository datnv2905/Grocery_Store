<template>
  <div class="row">
    <div class="col-sm-3 section-main">
      <Categoriess />
    </div>
    <div class="col-sm-9">
      <div class="product-section">
        <div class="row">
          <div v-for="p in products" class="col-sm-3">
            <ProductCard :product="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Categoriess from "~/components/customer/Categoriess.vue";
import ProductCard from "~/components/customer/ProductCard.vue";

const route = useRoute();
const categoryId = route.params.categoryId;
const products = ref(null);

// Điều chỉnh API để gọi đúng với query parameter
async function fetchProductsByCategory(categoryId) {
  try {
    // Sử dụng query parameter `category`
    products.value = await $fetch(
      `https://localhost:7224/api/product/getbycategory?category=${categoryId}`
    );
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

onMounted(() => {
  fetchProductsByCategory(categoryId);
});
</script>
