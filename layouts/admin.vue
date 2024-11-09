<!-- layouts/admin.vue -->
<template>
  <div class="d-flex admin-layout">
    
    <Sidebar class="main-content bg-light"/>
    
    <div class="content-wrapper flex-grow-1">
      <Navbar />
      <main class="container-fluid py-4">
        <slot/>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "~/components/admin/Sidebar.vue";
import Navbar from "~/components/admin/Navbar.vue";
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}

.main-content {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng */
}

.content-wrapper {
  overflow-y: auto;
}
</style>
