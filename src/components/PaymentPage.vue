<template>
  <div class="payment-page">
    <NavBar />

    <div class="payment-container container">
      <div class="row">
        <!-- Customer Details Section -->
        <div class="col-md-6 customer-details">
          <h3>Delivery Information</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.name" class="form-control" required 
                     pattern="[A-Za-z ]+" title="Only alphabets and spaces allowed" />
            </div>

            <div class="form-group">
              <label>Flat / House Number</label>
              <input v-model="form.flat" class="form-control" required />
            </div>

            <div class="form-group">
              <label>Street Address</label>
              <input v-model="form.address" class="form-control" required />
            </div>

            <div class="form-group">
              <label>District</label>
              <input v-model="form.district" class="form-control" required />
            </div>

            <div class="form-group">
              <label>State</label>
              <input v-model="form.state" class="form-control" required />
            </div>

            <div class="form-group">
              <label>Pincode</label>
              <input v-model="form.pincode" class="form-control" required 
                     pattern="[0-9]{6}" title="6-digit pincode" />
            </div>
          </form>
        </div>

        <!-- Payment Options Section -->
        <div class="col-md-6 payment-options">
          <h3>Select Payment Method</h3>

          <!-- UPI Payment Option -->
          <div class="payment-option">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="upi" value="UPI" v-model="selectedPayment" />
              <label class="form-check-label" for="upi">
                Amazon Pay UPI
              </label>
            </div>
          </div>

          <!-- Card Payment Option -->
          <div class="payment-option" :class="{highlight: selectedPayment === 'Card'}">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="card" value="Card" v-model="selectedPayment" />
              <label class="form-check-label" for="card">
                Credit or Debit Card
                <img src="https://img.icons8.com/color/48/000000/visa.png" class="card-icon" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" class="card-icon" />
                <img src="https://img.icons8.com/color/48/000000/rupay.png" class="card-icon" />
              </label>
            </div>
            
            <!-- Card Details Form (shown when card is selected) -->
            <div v-if="selectedPayment === 'Card'" class="mt-3">
              <div class="form-group">
                <label>Card Number</label>
                <input v-model="cardDetails.number" class="form-control" 
                       placeholder="4242 4242 4242 4242" 
                       @input="formatCardNumber"
                       pattern="[0-9\s]{13,19}" 
                       required />
              </div>
              
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input v-model="cardDetails.expiry" class="form-control" 
                           placeholder="MM/YY" 
                           pattern="(0[1-9]|1[0-2])\/[0-9]{2}" 
                           required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>CVV</label>
                    <input v-model="cardDetails.cvv" class="form-control" 
                           placeholder="123" 
                           pattern="[0-9]{3,4}" 
                           type="password" 
                           required />
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>Cardholder Name</label>
                <input v-model="cardDetails.name" class="form-control" required />
              </div>
            </div>
          </div>

          <!-- Net Banking Option -->
          <div class="payment-option" :class="{highlight: selectedPayment === 'Net Banking'}">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="netbanking" value="Net Banking" v-model="selectedPayment" />
              <label class="form-check-label" for="netbanking">Net Banking</label>
            </div>
            <select class="form-select mt-2" v-if="selectedPayment === 'Net Banking'" v-model="selectedBank" required>
              <option value="" disabled selected>Choose a bank</option>
              <option value="SBI">SBI</option>
              <option value="ICICI">ICICI</option>
              <option value="HDFC">HDFC</option>
              <option value="Axis">Axis Bank</option>
            </select>
          </div>

          <!-- Other UPI Option -->
          <div class="payment-option" :class="{highlight: selectedPayment === 'Other UPI'}">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="otherUpi" value="Other UPI" v-model="selectedPayment" />
              <label class="form-check-label" for="otherUpi">Other UPI Apps</label>
            </div>
            <div v-if="selectedPayment === 'Other UPI'">
              <label class="form-label mt-2">Enter your UPI ID</label>
              <div class="input-group">
                <input type="text" class="form-control" v-model="upiId" 
                       placeholder="name@bank" 
                       pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9]+" 
                       required />
                <button class="btn btn-warning" @click.prevent="verifyUPI">Verify</button>
              </div>
              <small class="text-muted">Format: name@bank or phone@bank</small>
            </div>
          </div>

          <!-- COD Option -->
          <div class="payment-option" :class="{highlight: selectedPayment === 'COD'}">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="cod" value="COD" v-model="selectedPayment" />
              <label class="form-check-label" for="cod">
                Cash on Delivery / Pay on Delivery
              </label>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary mt-4 p-3 bg-light rounded">
            <h5>Order Summary</h5>
            <div class="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>₹{{ cartTotal }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Shipping:</span>
              <span>₹{{ shippingFee }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Taxes:</span>
              <span>₹{{ taxAmount }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₹{{ totalAmount }}</span>
            </div>
          </div>

          <!-- Pay Now/Place Order Button -->
          <button class="btn btn-success w-100 mt-4" @click="processPayment" :disabled="processingPayment">
            <i class="fas" :class="buttonIcon"></i>
            {{ buttonText }}
          </button>
          
          <!-- Security Badges -->
          <div class="security-badges mt-3 text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/2451/2451988.png" alt="SSL Secure" height="40" class="me-2">
            <img src="https://cdn-icons-png.flaticon.com/512/888/888871.png" alt="PCI Compliant" height="40">
          </div>
        </div>
      </div>
    </div>

    <footer class="payment-footer">
      <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Payment App Logo" class="footer-logo" />
      <p>DioDap Payments &copy; 2025</p>
    </footer>
    
    <!-- Payment Processing Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div v-if="paymentStatus === 'processing'">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">{{ processingMessage }}</p>
            </div>
            <div v-else-if="paymentStatus === 'success'" class="text-success">
              <i class="fas fa-check-circle fa-4x mb-3"></i>
              <h4>{{ successTitle }}</h4>
              <p>Your order #{{ orderId }} has been placed.</p>
              <p>A confirmation has been sent to your email.</p>
            </div>
            <div v-else class="text-danger">
              <i class="fas fa-times-circle fa-4x mb-3"></i>
              <h4>Payment Failed</h4>
              <p>{{ errorMessage }}</p>
              <p>Please try again or use a different payment method.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button v-if="paymentStatus === 'success'" class="" @click="redirectToSuccessPage">
              View Order Details
            </button>
            <button v-else-if="paymentStatus === 'error'" class="btn btn-warning" @click="retryPayment">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import { Modal } from 'bootstrap'

export default {
  components: { NavBar },
  data() {
    return {
      form: {
        name: '',
        flat: '',
        address: '',
        district: '',
        state: '',
        pincode: ''
      },
      selectedPayment: 'UPI',
      selectedBank: '',
      upiId: '',
      cardDetails: {
        number: '',
        expiry: '',
        cvv: '',
        name: ''
      },
      cartTotal: 2499.00,
      shippingFee: 49.00,
      taxAmount: 299.88,
      processingPayment: false,
      paymentStatus: '', // 'processing', 'success', 'error'
      errorMessage: '',
      orderId: '',
      paymentModal: null
    }
  },
  computed: {
    totalAmount() {
      return (this.cartTotal + this.shippingFee + this.taxAmount).toFixed(2)
    },
    buttonText() {
      if (this.processingPayment) return 'Processing...'
      return this.selectedPayment === 'COD' ? 'Place Order' : 'Pay Now'
    },
    buttonIcon() {
      return this.selectedPayment === 'COD' ? 'fa-shopping-bag me-2' : 'fa-money-check-alt me-2'
    },
    modalTitle() {
      return this.selectedPayment === 'COD' ? 'Placing Order' : 'Processing Payment'
    },
    processingMessage() {
      return this.selectedPayment === 'COD' 
        ? 'Please wait while we place your order...' 
        : 'Please wait while we process your payment...'
    },
    successTitle() {
      return this.selectedPayment === 'COD' ? 'Order Placed!' : 'Payment Successful!'
    }
  },
  mounted() {
    this.paymentModal = new Modal(document.getElementById('paymentModal'))
  },
  methods: {
    formatCardNumber() {
      // Add spaces every 4 digits for better readability
      this.cardDetails.number = this.cardDetails.number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    },
    verifyUPI() {
      if (!this.upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/)) {
        alert('Please enter a valid UPI ID (format: name@bank)')
        return
      }
      alert(`UPI ID ${this.upiId} verification request sent`)
    },
    validateForm() {
      // Basic validation - in a real app, you'd want more thorough validation
      if (!this.form.name || !this.form.address || !this.form.pincode) {
        alert('Please fill in all required delivery information')
        return false
      }
      
      if (this.selectedPayment === 'Card') {
        if (!this.cardDetails.number || !this.cardDetails.expiry || !this.cardDetails.cvv || !this.cardDetails.name) {
          alert('Please fill in all card details')
          return false
        }
      } else if (this.selectedPayment === 'Net Banking' && !this.selectedBank) {
        alert('Please select a bank')
        return false
      } else if (this.selectedPayment === 'Other UPI' && !this.upiId) {
        alert('Please enter your UPI ID')
        return false
      }
      
      return true
    },
    async processPayment() {
      if (!this.validateForm()) return
      
      this.processingPayment = true
      this.paymentStatus = 'processing'
      this.paymentModal.show()
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Generate order ID with appropriate prefix
        this.orderId = (this.selectedPayment === 'COD' ? 'COD' : 'ORD') + 
                       Math.floor(100000 + Math.random() * 900000)
        
        this.paymentStatus = 'success'
        
        // In a real app:
        // 1. Send order details to backend
        // 2. Process payment if not COD
        // 3. Handle response
        
      } catch (error) {
        this.paymentStatus = 'error'
        this.errorMessage = error.message || 
          (this.selectedPayment === 'COD' ? 'Order placement failed' : 'Payment processing failed')
      } finally {
        this.processingPayment = false
      }
    },
    redirectToSuccessPage() {
      this.paymentModal.hide()
      this.$router.push({
        path: '/payment-success',
        query: {
          orderId: this.orderId,
          amount: this.totalAmount,
          method: this.selectedPayment
        }
      })
    },
    retryPayment() {
      this.paymentModal.hide()
    }
  }
}
</script>

<style scoped>
.payment-page {
  background: #f3f4f6;
  min-height: 100vh;
  padding-bottom: 80px;
}

.payment-container {
  background: #fff;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

h3, h5 {
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control, .form-select {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  width: 100%;
}

.payment-option {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.payment-option.highlight {
  border: 2px solid #4f46e5;
  background-color: #f0f5ff;
}

.card-icon {
  height: 24px;
  margin-left: 8px;
}

.payment-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #1f2937;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.footer-logo {
  width: 40px;
  height: 40px;
  margin-bottom: 0.25rem;
}

.order-summary {
  border: 1px solid #e5e7eb;
}

.security-badges img {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.security-badges img:hover {
  opacity: 1;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>