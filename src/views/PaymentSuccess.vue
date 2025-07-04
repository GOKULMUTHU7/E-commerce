<template>
  <div class="payment-success-container">
    <NavBar />
    
    <div class="success-content">
      <!-- Animated checkmark -->
      <div class="success-animation">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>

      <h1 class="success-title">Payment Successful!</h1>
      
      <div class="order-details">
        <p>Order ID: <strong>{{ orderId }}</strong></p>
        <p>Amount Paid: <strong>₹{{ amountPaid }}</strong></p>
        <p>Payment Method: <strong>{{ paymentMethod }}</strong></p>
        <p>Estimated Delivery: <strong>{{ deliveryDate }}</strong></p>
      </div>

      <div class="success-message">
        <p>Thank you for your order! We've received your payment.</p>
        <p>A confirmation has been sent to your email.</p>
      </div>

      <div class="action-buttons">
        <router-link to="/orders" class="btn view-orders-btn">
          View My Orders
        </router-link>
        <router-link to="/" class="btn continue-shopping-btn">
          Continue Shopping
        </router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

export default {
  components: { NavBar, Footer },
  data() {
    return {
      orderId: 'ORD' + Math.floor(100000 + Math.random() * 900000),
      amountPaid: '0.00',
      paymentMethod: 'Cash on Delivery',
      deliveryDate: this.getDeliveryDate(3)
    }
  },
  created() {
    // In a real app, you would get these values from:
    // 1. Route params
    // 2. Vuex/Pinia store
    // 3. API response
    
    // For demo purposes, we'll simulate getting data
    if (this.$route.query.amount) {
      this.amountPaid = parseFloat(this.$route.query.amount).toFixed(2)
    }
    if (this.$route.query.method) {
      this.paymentMethod = this.$route.query.method
    }
  },
  methods: {
    getDeliveryDate(daysToAdd) {
      const date = new Date()
      date.setDate(date.getDate() + daysToAdd)
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }
}
</script>

<style scoped>
.payment-success-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.success-content {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  flex: 1;
}

.success-animation {
  margin: 0 auto 2rem;
  width: 150px;
  height: 150px;
}

.checkmark {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: 0 0 0 rgba(75, 183, 27, 0.4);
  animation: checkmark-fill 0.4s ease-in-out 0.4s forwards, 
             checkmark-scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: none;
  animation: checkmark-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkmark-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.success-title {
  color: #2e7d32;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.order-details {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: left;
}

.order-details p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.success-message {
  margin: 2rem 0;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-orders-btn {
  background-color: #2e7d32;
  color: white;
  border: 2px solid #2e7d32;
}

.view-orders-btn:hover {
  background-color: #1b5e20;
  border-color: #1b5e20;
}

.continue-shopping-btn {
  background-color: white;
  color: #2e7d32;
  border: 2px solid #2e7d32;
}

.continue-shopping-btn:hover {
  background-color: #f1f8e9;
}

/* Animations */
@keyframes checkmark-stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark-scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes checkmark-fill {
  100% {
    box-shadow: inset 0 0 0 100px rgba(75, 183, 27, 0.1);
  }
}

/* Floating animation */
.success-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 768px) {
  .success-content {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn {
    width: 100%;
  }
}
</style>