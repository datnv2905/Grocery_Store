<template>
    <div>
      hêllo
    </div>
</template>

<script setup>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyC5Tc7d24xr4NoRd0mFgpwhWdMWuUWB_wo",
  authDomain: "test-notification-45aae.firebaseapp.com",
  projectId: "test-notification-45aae",
  storageBucket: "test-notification-45aae.firebasestorage.app",
  messagingSenderId: "425017129847",
  appId: "1:425017129847:web:60fd67755d50637e0fbf72",
  measurementId: "G-6MQL36WPF4"
};

onMounted(() => {
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Lắng nghe các tin nhắn FCM
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BByu_u-e_uNPsFo2_76YjFUxG5F1wpYhv98N0vaWCfG14Ir-vPD8hIe3FNLeLe8T8u4rjNuhaIKND_KKSoFYlQ0' }).then((currentToken) => {
  if (currentToken) {
    console.log("Token is: ", currentToken)
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurr  ed while retrieving token. ', err);
  // ...
});

})

</script>

<style lang="scss" scoped>

</style>