<template>
    <div class="container">
      <h2>Create Notification</h2>
      <form @submit.prevent="submitNotification">
        <div class="form-group">
          <label for="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            v-model="notification.imageUrl"
            class="form-control"
            placeholder="Enter Image URL or Base64 string"
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
            type="datetime-local"
            id="startDate"
            v-model="notification.startDate"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            v-model="notification.endDate"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="isActive">Is Active:</label>
          <select
            v-model="notification.isActive"
            class="form-control"
            id="isActive"
          >
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary mt-3">
          Create Notification
        </button>
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
  definePageMeta({
    layout: "admin",
  });
  import { ref } from "vue";
  
  const notification = ref({
    imageUrl: "",
    title: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });
  
  const successMessage = ref("");
  const errorMessage = ref("");
  
  async function submitNotification() {
    try {
      const response = await $fetch(
        "https://localhost:7224/api/notification/create",
        {
          method: "POST",
          body: notification.value,
        }
      );
  
      successMessage.value = "Notification created successfully!";
      errorMessage.value = "";
      // Clear the form after successful submission
      notification.value = {
        imageUrl: "",
        title: "",
        startDate: "",
        endDate: "",
        isActive: true,
      };
    } catch (error) {
      console.error("Error creating notification:", error);
      errorMessage.value = "Failed to create notification. Please try again.";
      successMessage.value = "";
    }
  }
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
  