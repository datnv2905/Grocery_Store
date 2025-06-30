<template>
    <div>
      <button @click="getFcmToken">Get FCM Token and Send to Backend</button>
    </div>
  </template>
  
  <script setup>
  import { useNuxtApp } from '#app';
  import { useFetch } from '#app'; // hoặc $fetch tuỳ thuộc vào cấu hình của bạn
  
  const { $requestNotificationPermission } = useNuxtApp();
  
  const getFcmToken = async () => {
    // Bước 1: Lấy FCM Token từ Firebase
    const token = await $requestNotificationPermission();
    
    if (token) {
      console.log('FCM Token:', token);
  
      // Bước 2: Gửi token lên server
      const response = await $fetch('https://localhost:7224/api/firebase/register-token', {
        method: 'POST',
        body: {
          token: token,
        }
      });
  
      console.log('Server response:', response);
    } else {
      console.warn('Unable to get FCM token');
    }
  };
  </script>
  