<template>
  <NavBar />
  <div class="cart-container">
    <h2 class="cart-title">Your Shopping Cart</h2>

    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="table-wrapper">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td class="product-cell">
                <div class="product-info">
                  <img :src="item.image" :alt="item.title" class="product-image" />
                  <span class="product-title">{{ item.title }}</span>
                </div>
              </td>
              <td>₹{{ item.price.toFixed(2) }}</td>
              <td>
                <div class="quantity-controls">
                  <button 
                    @click="decreaseQuantity(item)" 
                    class="quantity-btn"
                    :disabled="item.quantity <= 1"
                  >
                    -
                  </button>
                  <span class="quantity-value">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
              </td>
              <td>₹{{ (item.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button @click="removeItem(item)" class="remove-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-summary">
        <div class="summary-text">
          <h4>Grand Total:</h4>
          <p class="amount">₹{{ grandTotal.toFixed(2) }}</p>
        </div>

        <router-link to="/payment">
          <button class="checkout-btn">Proceed to Payment</button>
        </router-link>
      </div>
    </div>

    <div v-else class="empty-cart">
      <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Empty Cart" class="empty-icon" />
      <p class="empty-message">Your cart is currently empty.</p>
      <router-link to="/" class="continue-shopping-btn">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import cart from '@/store/cart'

export default {
  components: { NavBar },
  data() {
    return {
      // Add reactive reference to force updates
      cartState: cart.getItems()
    }
  },
  computed: {
    cartItems() {
      return this.cartState
    },
    grandTotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      )
    }
  },
  methods: {
    increaseQuantity(item) {
      cart.addItem(item)
      this.updateCartState()
    },
    decreaseQuantity(item) {
      cart.decreaseQuantity(item.id)
      this.updateCartState()
    },
    removeItem(item) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        cart.removeItem(item.id)
        this.updateCartState()
      }
    },
    updateCartState() {
      // Force reactivity by creating a new array reference
      this.cartState = [...cart.getItems()]
    }
  }
}
</script>

<style scoped>
/* Your existing styles remain unchanged */
.cart-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
}

.cart-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
  text-align: center;
  vertical-align: middle;
}

.cart-table th {
  background-color: #f8fafc;
  color: #4a5568;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.product-cell {
  text-align: left;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  padding: 0.25rem;
  background: white;
}

.product-title {
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #cbd5e0;
  background: #fff;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
  background: #edf2f7;
  border-color: #a0aec0;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 36px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: #e53e3e;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #fff5f5;
}

.cart-summary {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.summary-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.summary-text h4 {
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0;
}

.amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2f855a;
}

.checkout-btn {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.checkout-btn:hover {
  background-color: #3182ce;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  width: 100px;
  opacity: 0.6;
  margin-bottom: 1rem;
}

.empty-message {
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.continue-shopping-btn {
  display: inline-block;
  background-color: #edf2f7;
  color: #2d3748;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #e2e8f0;
}

@media (max-width: 768px) {
  .cart-container {
    padding: 1rem;
  }
  
  .product-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .product-image {
    width: 50px;
    height: 50px;
  }
}
</style>