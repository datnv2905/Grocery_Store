<template>
  <div class="container mt-1">
    <h5>Danh Sách Sản Phẩm</h5>
    <div class="d-flex justify-content-between align-items-center my-3">
      <div>
        <button class="btn btn-success" @click="openModal">
          + Tạo mới sản phẩm
        </button>
        <!-- Thêm input cho phép người dùng chọn file -->
        <input
          type="file"
          @change="onFileUpload"
          style="display: inline-block"
          ref="fileInput"
        />

        <button class="btn btn-warning" @click="uploadExcelFile">
          Tải tệp lên
        </button>
        <button class="btn btn-info" @click="exportToExcel">Xuất Excel</button>
        <button class="btn btn-secondary">Xóa tất cả</button>
      </div>
      <div>
        <input type="text" class="form-control" placeholder="Tìm kiếm..." />
      </div>
    </div>
    <!-- Dropdown Category -->
    <div>
      <select
        v-model="selectedCategory"
        @change="onCategoryChange"
        class="form-select"
      >
        <option :value="null">-----Tất cả sản phẩm-----</option>
        <option
          v-for="category in categories"
          :key="category.categoryId"
          :value="category.categoryId"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="isLoading">
      <div v-if="products.length">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th class="col-0,5"><input type="checkbox" /></th>
              <th class="col-0,5">Mã sản phẩm</th>
              <th class="col-1,5">Tên sản phẩm</th>
              <th class="col-2">Mô tả</th>
              <th class="col-1">Ảnh</th>
              <th class="col-1">Số lượng</th>
              <th class="col-1">Giá tiền</th>
              <th class="col-1">Giá Nhập</th>
              <th class="col-1">Danh mục</th>
              <th class="col-1,5">Chức năng</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td><input type="checkbox" v-model="product.checked" /></td>
              <td>{{ product.productId }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>
                <img
                  :src="getProductImageUrl(product.imgUrl)"
                  alt="product.name"
                  class="img-thumbnail"
                  width="70"
                />
              </td>
              <!-- <td>
            <span
              class="badge"
              :class="{
                'bg-success': product.status === 'Còn hàng',
                'bg-danger': product.status !== 'Còn hàng',
              }"
            >
              {{ product.status }}
            </span>
          </td> -->
              <td>{{ product.stock }}</td>
              <td>{{ product.price }} đ</td>
              <td>{{ product.priceCost }} đ</td>
              <td>{{ product.categoryName }}</td>
              <td>
                <button
                  class="btn btn-warning btn-sm"
                  @click="openEditModal(product)"
                >
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-danger btn-sm">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else style="color: red">Không tìm thấy sản phẩm nào</div>
    </div>
    <div v-else>Đang tải dữ liệu...............</div>

    <!-- Modal thêm mới sản phẩm -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ show: showModal }"
      style="display: block"
      v-if="showModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tạo mới sản phẩm</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProduct">
              <div class="mb-3">
                <label for="productId" class="form-label">Mã sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct.productId"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label"
                  >Mô tả sản phẩm</label
                >
                <textarea
                  class="form-control"
                  v-model="newProduct.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Giá bán</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productPriceCost" class="form-label">Giá gốc</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.priceCost"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label">Số lượng</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.stock"
                />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label">Danh mục</label>
                <select
                  class="form-select"
                  v-model="newProduct.categoryId"
                  required
                >
                  <option :value="null">Chọn danh mục</option>
                  <option
                    v-for="category in categories"
                    :key="category.categoryId"
                    :value="category.categoryId"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="productImage" class="form-label"
                  >Ảnh sản phẩm</label
                >
                <input
                  type="file"
                  class="form-control"
                  @change="onFileChange"
                />
              </div>
              <button type="submit" class="btn btn-success">Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chỉnh sửa sản phẩm -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ show: showEditModal }"
      style="display: block"
      v-if="showEditModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chỉnh sửa sản phẩm</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeEditModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProduct">
              <div class="mb-3">
                <label for="productId" class="form-label">Mã sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct.productId"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newProduct.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label"
                  >Mô tả sản phẩm</label
                >
                <textarea
                  class="form-control"
                  v-model="newProduct.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Giá bán</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productPriceCost" class="form-label">Giá gốc</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.priceCost"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productStock" class="form-label">Số lượng</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="newProduct.stock"
                />
              </div>
              <div class="mb-3">
                <label for="productCategory" class="form-label">Danh mục</label>
                <select
                  class="form-select"
                  v-model="newProduct.categoryId"
                  required
                >
                  <option :value="null">Chọn danh mục</option>
                  <option
                    v-for="category in categories"
                    :key="category.categoryId"
                    :value="category.categoryId"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="productImage" class="form-label"
                  >Ảnh sản phẩm</label
                >
                <input
                  type="file"
                  class="form-control"
                  @change="onEditFileChange"
                />
              </div>
              <button type="submit" class="btn btn-success">Cập nhật</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const categories = ref([]);
const products = ref([]);
const selectedCategory = ref(null);
const isLoading = ref("");
const token = localStorage.getItem("token");

async function fetchCategories() {
  try {
    categories.value = await $fetch(
      "https://localhost:7224/api/categori/getall"
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
async function fetchProductByCategoryId(categoryId = null) {
  try {
    let url = "https://localhost:7224/api/product/getbycategory";
    if (categoryId !== null) {
      url += `?category=${categoryId}`;
    }
    products.value = await $fetch(url);
    products.value.forEach((product) => {
      product.checked = false; // Thêm thuộc tính 'checked' với giá trị mặc định là false
    });

    isLoading.value = true;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
onMounted(() => {
  fetchCategories();
  fetchProductByCategoryId();
});

// Khi người dùng thay đổi danh mục
function onCategoryChange() {
  fetchProductByCategoryId(selectedCategory.value);
}

const getProductImageUrl = (imageName) => {
  if (imageName) {
    return `/img/${imageName}`;
  } else {
    return "";
  } // Điều chỉnh URL tùy thuộc vào nơi lưu ảnh
};

//Modal tạo mới sản phẩm
const showModal = ref(false);
const newProduct = ref({
  productId: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  priceCost: 0,
  categoryId: null,
  imgUrl: null,
});

const showEditModal = ref(false);
// Hàm mở modal chỉnh sửa và điền dữ liệu sản phẩm cần sửa
const openEditModal = (products) => {
  newProduct.value = {
    productId: products.productId,
    name: products.name,
    description: products.description,
    price: products.price,
    stock: products.stock,
    priceCost: products.priceCost,
    categoryId: products.categoryId,
    imgUrl: products.imgUrl,
  };
  showEditModal.value = true;
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
const closeEditModal = () => {
  showEditModal.value = false;
};
const onFileChange = (event) => {
  newProduct.value.image = event.target.files[0];
};
const onEditFileChange = (event) => {
  newProduct.value.imgUrl = event.target.files[0];
};
const submitProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("productId", newProduct.value.productId);
    formData.append("name", newProduct.value.name);
    formData.append("description", newProduct.value.description);
    formData.append("price", newProduct.value.price);
    formData.append("stock", newProduct.value.stock);
    if (newProduct.value.image) {
      formData.append("imgUrl", newProduct.value.imgUrl);
    }
    formData.append("priceCost", newProduct.value.priceCost);
    formData.append("categoryId", newProduct.value.categoryId);

    // Gửi yêu cầu lưu sản phẩm
    if (showModal.value) {
      const response = await $fetch(
        "https://localhost:7224/api/product/create",
        {
          method: "POST",
          headers: {
          Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      closeModal();
    } else if (showEditModal.value) {
      const response = await $fetch(
        `https://localhost:7224/api/product/update?id=${newProduct.value.productId}`,
        {
          method: "PUT",
          headers: {
          Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      closeEditModal();
    }

    fetchProductByCategoryId(); // Cập nhật danh sách sản phẩm sau khi thêm mới
  } catch (error) {
    if (error.data && error.data.message) {
      console.error("Error:", error.data.message);
      alert(error.data.message); // Hiển thị thông báo lỗi từ API
    } else {
      console.error("Đã xảy ra lỗi không xác định.");
      alert("Đã xảy ra lỗi không xác định.");
    }
  }
};

//export excell
const exportToExcel = async () => {
  // Lọc ra những sản phẩm đã được đánh dấu checkbox
  const selectedProducts = products.value.filter((product) => product.checked);

  if (!selectedProducts || selectedProducts.length === 0) {
    alert("Bạn chưa chọn sản phẩm nào để xuất");
    return;
  }

  try {
    // Gửi danh sách các sản phẩm đã chọn tới API backend
    const response = await $fetch("https://localhost:7224/api/product/export", {
      method: "POST",
      body: JSON.stringify(selectedProducts), // Gửi dữ liệu sản phẩm đã chọn
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Đảm bảo nhận về dữ liệu kiểu blob (file)
    });

    // Tạo URL cho file Excel và tự động tải xuống
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "DanhSachSanPhamDaChon.xlsx"); // Tên file muốn lưu
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Lỗi khi xuất sản phẩm sang Excel:", error);
  }
};

//upLoad file excel
const uploadedFile = ref(null);
// Xử lý khi người dùng chọn file Excel
const onFileUpload = (event) => {
  uploadedFile.value = event.target.files[0];
};

const uploadExcelFile = async () => {
  if (!uploadedFile.value) {
    alert("Vui lòng chọn một tệp Excel để tải lên");
    return;
  }

  const formData = new FormData();
  formData.append("file", uploadedFile.value);

  try {
    // Gửi file Excel tới API backend
    const response = await $fetch("https://localhost:7224/api/product/upload", {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    alert(response.message);
    // Xử lý phản hồi sau khi tải tệp lên thành công (ví dụ: cập nhật danh sách sản phẩm)
    fetchProductByCategoryId();
  } catch (error) {
    console.error("Lỗi khi tải tệp Excel lên:", error);
  }
};
</script>

<style scoped>
.light {
  background-color: antiquewhite;
}
.table {
  margin-top: 20px;
}
.btn {
  margin-right: 5px;
}

/* modal create product */
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-dialog {
  max-width: 500px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal.show {
  display: block;
}
</style>
