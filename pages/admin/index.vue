<template>
    <div>
        Chào mừng bạn đến với Admin
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
    middleware: 'admin-auth',
});

</script>

<style scoped>

</style>