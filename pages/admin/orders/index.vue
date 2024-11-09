<template>
  <div class="container mt-1">
    <div class="row">
      <form @submit.prevent="getorder" class="mb-4 col-8">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="from" class="form-label">From Date:</label>
            <input
              type="date"
              v-model="fromDate"
              id="from"
              class="form-control"
            />
          </div>
          <div class="col-md-6">
            <label for="to" class="form-label">To Date:</label>
            <input type="date" v-model="toDate" id="to" class="form-control" />
          </div>
        </div>
        <div class="d-flex">
          <button type="submit" class="btn btn-primary">Tìm hóa đơn</button>
          <button class="btn btn-info ms-3" @click="exportOrdersToExcel">
            Xuất Excel
          </button>
        </div>
      </form>
      <div class="col-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Chỉ số</th>
              <th>Giá trị (VND)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doanh thu</td>
              <td>
                {{
                  totalRevenue
                    ? totalRevenue.toLocaleString()
                    : "Chưa có dữ liệu"
                }}
              </td>
            </tr>
            <tr>
              <td>Lãi</td>
              <td>
                {{ profit ? profit.toLocaleString() : "Chưa có dữ liệu" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <h3>Hóa Đơn</h3>
      <div>
        <input
          type="text"
          v-model="searchTerm"
          class="form-control"
          placeholder="Tìm kiếm..."
        />
      </div>
    </div>

    <div v-if="orders.length">
      <table class="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th class="col">Mã đơn hàng</th>
            <th class="col">Sản phẩm</th>
            <th class="col">Số lượng</th>
            <th class="col">Khách hàng</th>
            <th class="col">Tổng tiền</th>
            <th class="col">Trạng thái</th>
            <th class="col">Ngày</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="item in order.orderItem" :key="item.productId">
                  {{ item.productName }}
                </li>
              </ul>
            </td>
            <td>
              <ul class="list-unstyled quan">
                <li v-for="item in order.orderItem" :key="item.productId">
                  {{ item.quantity }}
                </li>
              </ul>
            </td>
            <td>{{ order.userName }}</td>
            <td>{{ order.totalAmount }}</td>
            <td v-for="payment in order.payment">
              {{ payment.paymentStatus }}
            </td>
            <td>{{ order.createdAt }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          <
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          >
        </button>
      </div>
    </div>
    <p v-else class="text-muted">Không tìm thấy hóa đơn nào.</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
import { ref, onMounted } from "vue";

const fromDate = ref("");
const toDate = ref("");
const orders = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = ref(0);
const totalRevenue = ref(); //doanh thu
const profit = ref(); //tiền lãi
const token = localStorage.getItem("token");

const searchTerm = ref(""); // New search term ref

async function fetchOrders() {
  try {
    const queryParams = new URLSearchParams();
    if (fromDate.value) queryParams.append("from", fromDate.value);
    if (toDate.value) queryParams.append("to", toDate.value);
    queryParams.append("page", currentPage.value);
    queryParams.append("pageSize", pageSize.value);

    const response = await $fetch(
      `https://localhost:7224/api/getorder-date?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orders.value = response.orders;
    totalRevenue.value = response.totalRevenue;
    profit.value = response.totalProfit;
    totalPages.value = Math.ceil(response.totalOrders / pageSize.value);
  } catch (error) {
    console.error("Error fetching orders:", error);
    alert("Failed to fetch orders. Please try again.");
  }
}

async function searchOrders() {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage.value);
    queryParams.append("pageSize", pageSize.value);
    if (searchTerm.value) queryParams.append("search", searchTerm.value);

    const response = await $fetch(
      `https://localhost:7224/api/search-order?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orders.value = response.orders;
    totalPages.value = Math.ceil(response.totalOrders / pageSize.value);
  } catch (error) {
    console.error("Error fetching orders:", error);
    alert("Failed to fetch orders. Please try again.");
  }
}

async function exportOrdersToExcel() {
  try {
    // Build the URL with query parameters
    const queryParams = new URLSearchParams();
    if (fromDate.value) queryParams.append("fromDate", fromDate.value);
    if (toDate.value) queryParams.append("toDate", toDate.value);

    // Make the request
    const response = await fetch(
      `https://localhost:7224/export-orders?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      // Convert the response to a Blob (binary large object)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element, set its download attribute, and trigger a click
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Orders_${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to download file.");
      alert("Failed to download file.");
    }
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    alert("Error exporting to Excel.");
  }
}

function changePage(newPage) {
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    fetchOrders();
  }
}

function getorder() {
  currentPage.value = 1;
  fetchOrders();
}

watch(searchTerm, () => {
  currentPage.value = 1;
  searchOrders();
});

onMounted(async () => {
  fetchOrders();
});
</script>

<style scoped>
.table thead {
  background-color: #f8f9fa;
}
.quan {
  text-align: center;
}
.text-mutednpm {
  font-size: 30px;
  text-align: center;
}
</style>
