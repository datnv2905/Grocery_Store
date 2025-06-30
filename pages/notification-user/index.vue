<template>
    <div class="notification-page">
      <h1>Thông báo của bạn</h1>
      <ul v-if="notifications.length > 0" class="notification-list">
        <li v-for="notification in notifications" :key="notification.id" class="notification-item">
          <h3>{{ notification.titleNoti }}</h3>
          <p>{{ notification.contentNoti }}</p>
          <span>Ngày: {{ formatDate(notification.createAt) }}</span>
        </li>
      </ul>
      <p v-else>Không có thông báo nào để hiển thị.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const notifications = ref([]);
  
  // Hàm lấy thông báo từ API
  const fetchNotifications = async () => {
    try {
      notifications.value = await $fetch('https://localhost:7224/api/notifications');
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
    }
  };
  
  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Tải thông báo khi component được mount
  onMounted(() => {
    fetchNotifications();
  });
  </script>
  
  <style scoped>
  .notification-page {
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  .notification-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .notification-item {
    background: #fff4e6;
    border: 1px solid #ffcd94;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
  }
  
  .notification-item h3 {
    margin: 0;
    color: #de6a3c;
  }
  
  .notification-item span {
    display: block;
    font-size: 0.9rem;
    color: #555;
  }
  </style>
  