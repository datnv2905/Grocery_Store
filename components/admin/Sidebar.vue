<!-- components/Sidebar.vue -->
<template>
    <aside class="sidebar bg-dark text-light p-3">
      <div class="sidebar-header">
        <h4 class="text-center mb-4">Admin........</h4>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin">
            <i class="bi bi-speedometer2"></i> Dashboard
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin/products">
            <i class="bi bi-box"></i> Sản phẩm
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin/orders">
            <i class="bi bi-receipt"></i> Đơn hàng
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin/notification">
            <i class="bi bi-people"></i> Thông Báo
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin/customers">
            <i class="bi bi-people"></i> Khách hàng
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink class="nav-link text-light" to="/admin/settings">
            <i class="bi bi-gear"></i> Cài đặt
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </template>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #343a40; /* Màu nền sidebar */
  }
  
  .sidebar-header h4 {
    color: #ffc107; /* Màu vàng nổi bật */
  }
  
  .nav-link {
    font-size: 16px;
  }
  
  .nav-link:hover {
    color: #ffc107; /* Đổi màu khi hover */
    background-color: #495057; /* Nền nhẹ khi hover */
    border-radius: 5px;
  }
  
  .bi {
    margin-right: 8px;
  }
  </style>
  