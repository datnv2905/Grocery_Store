<template>
    <div v-if="show" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  });
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex; 
    align-items: center;
    justify-content: center;
    background-color: #fcb563;
    z-index: 9999;
  }
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  </style>
  