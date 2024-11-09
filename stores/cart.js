// stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    orderInforTemp: {
      name: "",
      email: "",
    },
    // thông tin giỏ hàng
    cart: [],
    cart_product: [],
    cart_product_Temp: [],

    //thông tin đăng nhập
    token: import.meta.env.SSR ? "" : localStorage.getItem("token") || "",
    user: import.meta.env.SSR ? "" : localStorage.getItem("user") || "",
    role: import.meta.env.SSR ? "" : localStorage.getItem("role") || "",
    statusLogin: import.meta.env.SSR
      ? ""
      : localStorage.getItem("status-login") || "0",
  }),
  actions: {

    // isAuthenticated() {
    //   if (!import.meta.env.SSR){
    //     const token = localStorage.getItem("token");
    //     return token !== null && token !== "";
    //   }
    // },

    // isAdmin() {
    //   return this.role === "Admin";
    // },

    setOrderInfoTemp(_name, _email) {
      this.orderInforTemp = {
        name: _name,
        email: _email,
      };
      localStorage.setItem(
        "order-Infor-Temp",
        JSON.stringify(this.orderInforTemp)
      );
    },

    initCart() {
      if (!import.meta.env.SSR) {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        } else {
          // Lưu cart_info mặc định vào localStorage nếu không có dữ liệu trước đó
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }
      }
    },

    refreshLoginInfo() {
      this.token = localStorage.getItem("token") || "";
      this.user = localStorage.getItem("user") || "";
      this.role = localStorage.getItem("role") || "";
      this.statusLogin = localStorage.getItem("status-login") || "0";

      let stringJson1 = localStorage.getItem("cart_product");
      if (stringJson1) {
        this.cart_product = JSON.parse(stringJson1);
      }
      let stringJson2 = localStorage.getItem("cart");
      if (stringJson2) {
        this.cart = JSON.parse(stringJson1);
      }
      let stringJson4 = localStorage.getItem("cart_product_Temp");
      if (stringJson4) {
        this.cart_product_Temp = JSON.parse(stringJson1);
      }
      let stringJson3 = localStorage.getItem("order-Infor-Temp");
      if (stringJson3) {
        this.orderInforTemp = JSON.parse(stringJson3);
      }
      
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCart(product, quantity) {
      const newItem = {
        productId: product.productId,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
        categoryName: product.categoryName,
      };
      const itemIndex = this.cart.findIndex(
        (item) => item.productId === newItem.productId
      ); //tìm trong giỏ hàng không có thì trả về -1 , có thì trả về index
      if (itemIndex > -1) {
        this.cart[itemIndex].quantity += quantity;
      } else {
        this.cart.push(newItem);
      }
      this.saveCartToLocalStorage();
    },

    saveCartToLocalStorage() {
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },

    saveCart_TempToLocalStorage() {
      if (process.client) {
        localStorage.setItem("cart_product_Temp", JSON.stringify(this.cart_product_Temp));
      }
    },

    updateCart_Product(data) {
      this.cart_product = data;
      localStorage.setItem("cart_product", JSON.stringify(this.cart_product));
    },

    updateCart_Product_Temp(data) {
      this.cart_product_Temp = data;
      localStorage.setItem("cart_product_Temp", JSON.stringify(this.cart_product_Temp));
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.productId !== productId);
      this.saveCartToLocalStorage();
    },
    //remove trong cart_product_temp
    removeFromCart_Temp(productId) {
      this.cart_product_Temp = this.cart_product_Temp.filter((item) => item.productId !== productId);
      this.saveCart_TempToLocalStorage();
    },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity(productId, quantity) {
      const item = this.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
        this.saveCartToLocalStorage();
      }
    },
    
  },
});
