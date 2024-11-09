<template>
  <div class="section-nav">
    <div class="title-nav justify-content-center">Danh Mục Sản phẩm</div>

    <div class="option-select">
      <ul v-if="categories">
        <li class="line" v-for="categori in categories" :key="categori.categoryId">
          <button class="boders" :class="{ active: selectedCategory === categori.categoryId }"
            @click="goToCategory(categori.categoryId)">
            {{ categori.name }}
          </button>
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'nuxt/app';

const router = useRouter();
const route = useRoute();

const categories = ref(null);
const selectedCategory = ref(null);
async function fetchCategories() {
  try {
    categories.value = await $fetch('https://localhost:7224/api/categori/getall');
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

// Điều hướng đến trang category với categoryId
function goToCategory(categoryId) {
  
  router.push(`/categories/${categoryId}`);
}
watch(route, () => {
  selectedCategory.value = route.params.categoryId;
});
// Gọi hàm fetchCategories khi component được mount
onMounted(() => {
  fetchCategories();
  selectedCategory.value = route.params.categoryId;
})
</script>

<style scoped>
.option-select ul {
  list-style-type: none;
  padding: 0;
}

.option-select li {
  padding: 5px 0;
}

.section-nav {
  background-color: #fff;
}

.section-nav .title-nav {
  background-color: #dd2929;
  color: #fff;
  padding: 10px;
}

.boders {
  border: 1px solid #fff;
  background-color: #fff;
  width: 100%;
  text-align: start;
}

.line {
  border-bottom: 1px solid #000;
  margin: 0 10px 0 10px;
}

.boders:hover {
  background-color: #da7a54;
  color: #fff;
  border: 1px solid #da7a54;
}

.boders.active {
  background-color: #da7a54;
  color: #fff;
  border: 1px solid #da7a54;
}
</style>
