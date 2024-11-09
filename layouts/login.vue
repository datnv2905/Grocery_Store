<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div
      class="container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <!-- Logo và nút mở/đóng navbar -->
      <div class="col-3 d-flex justify-content-center">
        <a class="navbar-brand fw-bold fs-3" href="/">
          <img class="logo" src="public/img/logo.png" alt="Logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div
        class="collapse navbar-collapse justify-content-center color2"
        id="navbarNav"
      >
        <ul class="navbar-nav p-2">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">Trang Chủ</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/register" class="nav-link">Đăng Ký</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/login" class="nav-link">Đăng Nhập</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="dynamic-bg">
    <div class="container p-5">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.color2 {
  max-height: 30px;
}
.logo {
  max-width: 200px;
}
/* Logo thương hiệu */
.navbar-brand {
  font-size: 1.8rem;
  color: #de6a3c;
}

.btn-outline-success:hover {
  background-color: #de6a3c;
  color: white;
  border-color: #de6a3c;
}

/* Thiết lập cho các link */
.nav-link {
  font-size: 1rem;
  font-weight: bold;
  margin-right: 15px;
  color: #555;
}

.nav-link:hover {
  color: #de6a3c;
  text-decoration: underline;
}

i.bi-cart4:hover {
  color: #de6a3c;
}
</style>
