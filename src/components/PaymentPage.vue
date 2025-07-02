<template>
  <div class="payment-page">
    <NavBar />

    <div class="payment-container container">
      <div class="row">

        <div class="col-md-6 customer-details">
          <h3>Delivery Information</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.name" class="form-control" required />
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
              <input v-model="form.pincode" class="form-control" required />
            </div>
          </form>
        </div>

        <div class="col-md-6 payment-options">
          <h3>Select Payment Method</h3>

          <div class="payment-option">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="upi" value="UPI" v-model="selectedPayment" />
              <label class="form-check-label" for="upi">
                Amazon Pay UPI - 
              </label>
            </div>
          </div>

          <div class="payment-option">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="card" value="Card" v-model="selectedPayment" />
              <label class="form-check-label" for="card">
                Credit or Debit Card
                <img src="https://img.icons8.com/color/48/000000/visa.png" class="card-icon" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" class="card-icon" />
                <img src="https://img.icons8.com/color/48/000000/rupay.png" class="card-icon" />
              </label>
            </div>
          </div>

          <div class="payment-option">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="netbanking" value="Net Banking" v-model="selectedPayment" />
              <label class="form-check-label" for="netbanking">Net Banking</label>
            </div>
            <select class="form-select mt-2" v-if="selectedPayment === 'Net Banking'">
              <option disabled selected>Choose a bank</option>
              <option>SBI</option>
              <option>ICICI</option>
              <option>HDFC</option>
              <option>Axis Bank</option>
            </select>
          </div>

          <div class="payment-option highlight" v-if="selectedPayment === 'Other UPI'">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="otherUpi" value="Other UPI" v-model="selectedPayment" />
              <label class="form-check-label" for="otherUpi">Other UPI Apps</label>
            </div>
            <label class="form-label mt-2">Enter your UPI ID</label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="upiId" placeholder="name@bank" />
              <button class="btn btn-warning">Verify</button>
            </div>
            <small class="text-muted">Format: name/phone@bankname</small>
          </div>

          <div class="payment-option">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="cod" value="COD" v-model="selectedPayment" />
              <label class="form-check-label" for="cod">
                Cash on Delivery / Pay on Delivery
              </label>
            </div>
          </div>

          <button class="btn btn-success w-100 mt-4" @click="payNow">
            <i class="fas fa-money-check-alt me-2"></i>Pay Now
          </button>
        </div>
      </div>
    </div>

    <footer class="payment-footer">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Payment App Logo"
        class="footer-logo"
      />
      <p>DioDap Payments &copy; 2025</p>
    </footer>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

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
      upiId: ''
    }
  },
  methods: {
    payNow() {
      alert(`Payment Method: ${this.selectedPayment}\nName: ${this.form.name}`);
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

h3 {
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
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
}

.payment-option.highlight {
  border: 2px solid #f59e0b;
  background-color: #fffbea;
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
</style>
