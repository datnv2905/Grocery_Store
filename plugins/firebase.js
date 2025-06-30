import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC5Tc7d24xr4NoRd0mFgpwhWdMWuUWB_wo",
  authDomain: "test-notification-45aae.firebaseapp.com",
  projectId: "test-notification-45aae",
  storageBucket: "test-notification-45aae.firebasestorage.app",
  messagingSenderId: "425017129847",
  appId: "1:425017129847:web:60fd67755d50637e0fbf72",
  measurementId: "G-6MQL36WPF4",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Hàm hiển thị thông báo trên màn hình
const showNotification = (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
};


export default defineNuxtPlugin((nuxtApp) => {
  // Yêu cầu quyền và lấy token nếu người dùng cho phép
  const requestNotificationPermission = async () => {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          const token = await getToken(messaging, { vapidKey: 'BByu_u-e_uNPsFo2_76YjFUxG5F1wpYhv98N0vaWCfG14Ir-vPD8hIe3FNLeLe8T8u4rjNuhaIKND_KKSoFYlQ0' });
          // Send the token to your server and update the UI if necessary
          console.log('FCM Token:', token);
          return token;
        } else {
          console.warn('Notification permission denied.');
          return null;
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // Lắng nghe các tin nhắn FCM
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    const { title, body } = payload.notification || {};
  
  if (title && body) {
    // Hiển thị thông báo bằng Notification API
    showNotification(title, body);
  }
  });

  nuxtApp.provide("messaging", messaging);
  nuxtApp.provide(
    "requestNotificationPermission",
    requestNotificationPermission
  );
});
