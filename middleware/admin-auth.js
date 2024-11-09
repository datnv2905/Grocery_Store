export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.env.SSR) {
     const roles = (localStorage.getItem('role') || '[]');
     console.log(roles);
     if (to.path === '/admin' && !roles.includes("Admin")) {
      // Redirect to an error or unauthorized page
      window.location.href = '/error';   
    }
  }
  // Check if the user has the 'admin' role
  
});

// export default defineNuxtRouteMiddleware((to) => {
//   const roles = !import.meta.env.SSR
//     ? JSON.parse(localStorage.getItem('role') || '[]')
//     : [];

//   console.log('Roles:', roles);

//   // Kiểm tra nếu người dùng không có quyền truy cập trang admin
//   if (to.path === '/admin' && !roles.includes('Admin')) {
//     return navigateTo('/error');
//   }
// });

// export default defineNuxtRouteMiddleware((to) => {
//   // Chỉ truy cập localStorage trên client-side
//   if (!import.meta.env.SSR) {
//     const roles = JSON.parse(localStorage.getItem('role') || '[]');
//     console.log('Roles:', roles);

//     // Kiểm tra nếu người dùng không có quyền truy cập trang admin
//     if (to.path === '/admin' && !roles.includes('Admin')) {
//       return navigateTo('/error');
//     }
//   }
// });

