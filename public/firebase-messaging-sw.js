
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyC5Tc7d24xr4NoRd0mFgpwhWdMWuUWB_wo",
    authDomain: "test-notification-45aae.firebaseapp.com",
    projectId: "test-notification-45aae",
    storageBucket: "test-notification-45aae.firebasestorage.app",
    messagingSenderId: "425017129847",
    appId: "1:425017129847:web:60fd67755d50637e0fbf72",
    measurementId: "G-6MQL36WPF4"
  });

const messaging = firebase.messaging();

//Lắng nghe thông báo khi ứng dụng đang chạy trong nền.
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  //Hiển thị thông báo ngay cả khi người dùng không mở trang web.
  self.registration.showNotification(notificationTitle, notificationOptions);
});