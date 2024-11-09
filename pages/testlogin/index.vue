<template>
  <div class="container">
    <h2>Update Notification</h2>

    <form @submit.prevent="updateNotification">
      <div class="form-group">
        <label for="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          v-model="notification.imageUrl"
          class="form-control"
          placeholder="Enter Image URL or Base64 string"
          required
        />
      </div>

      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          v-model="notification.title"
          class="form-control"
          placeholder="Enter Notification Title"
          required
        />
      </div>

      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          v-model="notification.startDate"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          v-model="notification.endDate"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="isActive">Is Active:</label>
        <select v-model="notification.isActive" class="form-control" id="isActive">
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary mt-3">Update Notification</button>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// State variables
const notification = ref({
  id: null,
  imageUrl: '',
  title: '',
  startDate: '',
  endDate: '',
  isActive: true,
})

const successMessage = ref('')
const errorMessage = ref('')

// Fetch notification details
async function fetchNotification() {
  try {
    const { id } = route.params
    const response = await $fetch(`https://localhost:7224/api/notification/updatenoti?id=${id}`)
    notification.value = response
  } catch (error) {
    errorMessage.value = 'Failed to load notification data.'
  }
}

// Update notification function
async function updateNotification() {
  try {
    const { id } = route.params
    const response = await $fetch(`https://localhost:7224/api/notification/updatenoti?id=${id}`, {
      method: 'PUT',
      body: notification.value,
    })

    successMessage.value = response.message
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to update notification. Please try again.'
    successMessage.value = ''
  }
}

onMounted(() => {
  fetchNotification()
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}
</style>
