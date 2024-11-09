<template>
  <nav class="navbar navbar-expand-lg navbar-light ">
    <div class="container-fluid d-flex flex-column">
        <div
          class="container-fluid d-flex justify-content-around align-items-center row"
        >
          <!-- Logo và nút mở/đóng navbar -->
          <div class="col-3 d-flex justify-content-end">
            <a class="navbar-brand fw-bold fs-3" href="/">
            <img class="logo" src="public/img/logo.png" alt="Logo">
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

          <!-- Tìm kiếm ở giữa -->
          <form
            class="d-flex flex-grow-1 mx-auto search-bar justify-content-center col-6"
          >
            <input
              class="form-control me-2"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Tìm Kiếm
            </button>
          </form>

          <!-- Phần điều hướng đăng nhập/giỏ hàng hoặc tài khoản người dùng -->
          <div class="d-flex align-items-center justify-content-end col-3">
            <NuxtLink to="/cart" class="nav-link">
              <i class="fa-solid fa-cart-shopping bi-cart4"></i><span>Giỏ hàng</span>
            </NuxtLink>

            <template v-if="isLoggedIn">
              <!-- Hiển thị thông tin tài khoản khi đã đăng nhập -->
              <div class="dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">
                <button class="btn dropdown-toggle nav-link" type="button">
                  <i class="fa-solid fa-user"></i> Tài khoản
                </button>
                <ul class="dropdown-menu mocup" :class="{ show: isDropdownVisible }">
                  <li><a class="dropdown-item" href="#">Người dùng:{{ user.username }} </a></li>
                  <li v-if="isAdmin"><a class="dropdown-item" href="/admin">Trang quản trị </a></li>
                  <li><a class="dropdown-item" href="#" @click="logout">Đăng xuất</a></li>
                  <li><a class="dropdown-item" href="#">Cài đặt</a></li>
                </ul>
              </div>
            </template>
            
            <template v-else>
              <!-- Hiển thị Đăng ký và Đăng nhập khi chưa đăng nhập -->
              <NuxtLink to="/register" class="nav-link">Đăng ký</NuxtLink> /
              <NuxtLink to="/login" class="nav-link">Đăng Nhập</NuxtLink>
            </template>
          </div>
        </div>

        <div
          class="collapse navbar-collapse justify-content-center color2"
          id="navbarNav"
        >
          <ul class="navbar-nav p-2">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link"><i class="fa-solid fa-house"></i> Trang Chủ</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link"><i class="fa-solid fa-fire-flame-curved"></i> Hot Deals</NuxtLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><i class="fa-solid fa-phone"></i> Contact</a>
            </li>
          </ul>
        </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


const roles = ref([]);
const isAdmin = computed(() => roles.value.includes('Admin'));

// const role = localStorage.getItem("role")
const isLoggedIn = ref(false) 
const user = ref({ username: '' })  
const router = useRouter()
//xử lý dropdown
const isDropdownVisible = ref(false);
function showDropdown() {
  isDropdownVisible.value = true;
}

function hideDropdown() {
  isDropdownVisible.value = false;
}
// Kiểm tra trạng thái đăng nhập khi component được mount
onMounted(() => {
  const token = localStorage.getItem('token')  
  const userInfo = localStorage.getItem('user') 
  const storedRoles = JSON.parse(localStorage.getItem("role") || '[]');
  roles.value = storedRoles;
  if (token) {
    isLoggedIn.value = true  // Nếu có token và user info -> người dùng đã đăng nhập
    user.value = JSON.parse(userInfo)  // Chuyển JSON thành đối tượng user
  }
})

// Hàm xử lý đăng xuất
const logout = () => {
  localStorage.removeItem('token')  
  localStorage.removeItem('user')   
  localStorage.removeItem('role')   
  localStorage.removeItem('status-login')
  localStorage.removeItem('order-Infor-Temp')
  isLoggedIn.value = false  // Đặt trạng thái đăng xuất
  router.push('/login')  
}
</script>

<style scoped>
/* Các style của bạn */
.color2 {
  max-height: 30px;
}
.logo{
  max-width: 200px;
}
/* Logo thương hiệu */
.navbar-brand {
  font-size: 1.8rem;
  color: #de6a3c;
}

/* Thanh tìm kiếm */
.search-bar input {
  max-width: 400px; /* Giới hạn độ rộng của thanh tìm kiếm */
  width: 100%;
  border-radius: 20px;
}

/* Thiết kế nút tìm kiếm */
.btn-outline-success {
  border-color: #de6a3c;
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
  color: #da7a54;
}

.nav-link:hover {
  color: #531802;
  text-decoration: underline;
}

/* Giỏ hàng */
i.bi-cart4 {
  color: #de6a3c;
  margin-right: 5px;
}

i.bi-cart4:hover {
  color: #531802;
}

.mocup{
  margin-left: -50px;
}

</style>
