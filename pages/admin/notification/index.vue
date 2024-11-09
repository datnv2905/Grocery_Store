<template>
  <div class="container">
    <h2 class="text-center mb-4">Notifications</h2>
    
    <div class="mb-3">
      <!-- <button class="btn btn-primary" @click="createNotification">
       + Create New Notification
      </button> -->
      <NuxtLink to="/admin/notification/createNotifi" class="btn btn-primary">+ Create New Notification</NuxtLink>
    </div>
    
    <!-- Notification Table -->
    <table v-if="notifications && notifications.length" class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Image URL</th>
          <th scope="col">Title</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in notifications" :key="notification.id">
          <td>{{ notification.id }}</td>
          <td>{{ notification.imageUrl }}</td>
          <td>{{ notification.title }}</td>
          <td>{{ formatDate(notification.startDate) }}</td>
          <td>{{ formatDate(notification.endDate) }}</td>
          <td>
            <span :class="{'text-success': notification.isActive, 'text-danger': !notification.isActive}">
              {{ notification.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td class="d-flex">
            <button class="btn btn-sm btn-warning me-2" @click="openUpdateForm(notification)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteNotification(notification.id)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <p>No notifications available.</p>
    </div>
    <!-- Update Form Modal -->
    <div v-if="selectedNotification" class="modal show" tabindex="-1" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Notification</h5>
            <button type="button" class="btn-close" @click="closeUpdateForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitUpdate">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input v-model="selectedNotification.title" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Image URL</label>
                <input v-model="selectedNotification.imageUrl" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Start Date</label>
                <input v-model="selectedNotification.startDate" type="datetime-local" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">End Date</label>
                <input v-model="selectedNotification.endDate" type="datetime-local" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="selectedNotification.isActive" class="form-select">
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
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
import { ref, onMounted } from 'vue';

const notifications = ref([]);
const selectedNotification = ref(null);

// Fetch Notifications
async function fetchNotifications() {
  try {
    notifications.value = await $fetch('https://localhost:7224/api/notification/getall');
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }
}

//update
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString();
}

function openUpdateForm(notification) {
  selectedNotification.value = { ...notification };
}

function closeUpdateForm() {
  selectedNotification.value = null;
}

async function submitUpdate() {
  if (!selectedNotification.value) return;

  try {
    const response = await $fetch('https://localhost:7224/api/notification/updatenoti', {
      method: 'PUT',
      params: { id: selectedNotification.value.id },
      body: selectedNotification.value,
    });

    if (response.message === "Notification updated successfully.") {
      // Update the list with the modified notification
      const index = notifications.value.findIndex(n => n.id === selectedNotification.value.id);
      if (index !== -1) {
        notifications.value[index] = { ...selectedNotification.value };
      }
      closeUpdateForm();
    } else {
      console.error("Update failed:", response);
    }
  } catch (error) {
    console.error("Failed to update notification:", error);
  }
}

//delete
async function deleteNotification(id) {
  if (!confirm("Are you sure you want to delete this notification?")) {
    return;
  }

  try {
    const response = await $fetch('https://localhost:7224/api/notification/delete', {
      method: 'POST',
      params: { id },
    });

    if (response.message === "Notification deleted successfully.") {
      // Remove the deleted notification from the list
      notifications.value = notifications.value.filter(notification => notification.id !== id);
      alert("Notification deleted successfully.");
    } else {
      alert("Notification not found.");
    }
  } catch (error) {
    alert("Failed to delete notification. Please try again.");
  }
}

onMounted(fetchNotifications);
</script>

<style>
/* Custom styling can be added here if needed */
</style>
