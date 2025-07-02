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
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.quantity }}</td>
              <td>₹{{ item.price }}</td>
              <td>₹{{ (item.price * item.quantity).toFixed(2) }}</td>
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
    </div>
  </div>
</template>

<script>
import cart from '@/store/cart'
import NavBar from './NavBar.vue'

export default {
  components: { NavBar },
  computed: {
    cartItems() {
      return cart.getItems()
    },
    grandTotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      )
    }
  }
}
</script>

<style scoped>
.cart-container {
  padding: 3rem 1rem;
  max-width: 960px;
  margin: 0 auto;
  background: #f3f4f6;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.cart-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
}

.table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  font-size: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.cart-table th {
  background-color: #111827;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cart-table tr:hover {
  background-color: #f1f5f9;
}

.cart-summary {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.summary-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-text h4 {
  font-size: 1.5rem;
  color: #1f2937;
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #10b981;
}

.checkout-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 120px;
  opacity: 0.7;
  margin-bottom: 1rem;
}

.empty-message {
  font-size: 1.25rem;
  color: #6b7280;
  font-style: italic;
}
</style>
