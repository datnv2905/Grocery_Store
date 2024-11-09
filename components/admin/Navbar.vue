<!-- components/Navbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm nav">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Quản trị viên</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/admin/profile">Tài khoản</NuxtLink>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link" @click="logout">Đăng xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  const logout = () => {
    // Logic đăng xuất
  }
  </script>
  
  <style scoped>
  .nav {
    padding: 15px 20px;
    background-color: #e4e6e8; 
  }
  
  .nav-link {
    font-size: 16px;
  }
  
  .nav-link:hover {
    color: #ffc107; 
  }
  </style>
  