<template>
    <div v-if="product">
        <CardDetails :product="product"/>
    </div>
</template>

<script setup>
import CardDetails from '~/components/customer/CardDetails.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
    const product = ref(null);
    const uri = `https://localhost:7224/api/product/getbyid?id=${id}`
    
    onMounted(async () => {
  try {
    product.value = await $fetch(uri); // Fetch dữ liệu từ API
    if (!product.value) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi hoặc điều hướng đến trang khác
  }
});

</script>

<style scoped>

</style>