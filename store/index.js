import { defineStore } from 'pinia';

export const cartStore2 = defineStore('cart_info', {
  state: () => ({
    cart_info: {
      saleCode: "",            // Mã khuyến mại (nếu có)
      currency: "USD",         // Đơn vị tiền tệ mặc định là USD
      saleDiscount: 0,         // Phần trăm giảm giá (mặc định là 0)
      saleMoney: 0,            // Số tiền giảm giá
      totalMoney: 0,           // Tổng tiền của giỏ hàng (không bao gồm giảm giá)
      paymentMoney: 0,         // Số tiền cần thanh toán sau khi giảm giá
      listProductCart: [],     // Danh sách sản phẩm trong giỏ hàng
    },
  }),

  actions: {
    // Khởi tạo giỏ hàng từ localStorage
    initCart() {
      if (!import.meta.env.SSR) {
        const savedCartInfo = localStorage.getItem('cart_info');
        if (savedCartInfo) {
          this.cart_info = JSON.parse(savedCartInfo);
        } else {
          // Lưu giỏ hàng mặc định vào localStorage nếu chưa có
          localStorage.setItem('cart_info', JSON.stringify(this.cart_info));
        }
      }
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCart(product, quantity) {
      const itemIndex = this.cart_info.listProductCart.findIndex((item) => item.productId === product.productId);
      
      if (itemIndex > -1) {
        // Sản phẩm đã có trong giỏ, chỉ tăng số lượng
        this.cart_info.listProductCart[itemIndex].quantity += quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        this.cart_info.listProductCart.push({ ...product, quantity });
      }

      // Cập nhật tổng số tiền và lưu lại
      this.updateTotalMoney();
      this.saveCartToLocalStorage();
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(productId) {
      this.cart_info.listProductCart = this.cart_info.listProductCart.filter((item) => item.productId !== productId);
      
      // Cập nhật tổng số tiền và lưu lại
      this.updateTotalMoney();
      this.saveCartToLocalStorage();
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity(productId, quantity) {
      const item = this.cart_info.listProductCart.find((item) => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId); // Nếu số lượng <= 0 thì xóa sản phẩm
        }
        this.updateTotalMoney(); // Cập nhật lại tổng tiền
        this.saveCartToLocalStorage();
      }
    },

    // Áp dụng mã giảm giá
    applyDiscount(saleCode, discountPercent) {
      this.cart_info.saleCode = saleCode;
      this.cart_info.saleDiscount = discountPercent;

      // Tính số tiền giảm giá và số tiền thanh toán
      this.cart_info.saleMoney = (this.cart_info.totalMoney * discountPercent) / 100;
      this.cart_info.paymentMoney = this.cart_info.totalMoney - this.cart_info.saleMoney;

      // Lưu lại vào localStorage
      this.saveCartToLocalStorage();
    },

    // Cập nhật tổng số tiền của giỏ hàng (không bao gồm giảm giá)
    updateTotalMoney() {
      this.cart_info.totalMoney = this.cart_info.listProductCart.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      this.cart_info.paymentMoney = this.cart_info.totalMoney - this.cart_info.saleMoney;
    },

    // Lưu giỏ hàng vào localStorage
    saveCartToLocalStorage() {
      if (!import.meta.env.SSR) {
        localStorage.setItem('cart_info', JSON.stringify(this.cart_info));
      }
    },
  },
});

// Trong component Vue/Nuxt.js của bạn, sử dụng `initCart` để khởi tạo giỏ hàng từ localStorage khi trang được tải
import { onMounted } from 'vue';
import { useCartStore } from '~/stores/cart';

export default {
  setup() {
    const cartStore = useCartStore();

    onMounted(() => {
      cartStore.initCart(); // Khởi tạo giỏ hàng từ localStorage khi trang được tải
    });
  },
};
