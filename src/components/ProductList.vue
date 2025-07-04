<template>
  <div>
    <NavBar />
    <div class="container my-5">
      <h2 class="text-center mb-4 title">Top Selling Products</h2>

      <!-- Toast Notification -->
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-primary text-white">
            <strong class="me-auto">Success</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            {{ toastMessage }}
          </div>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div class="col" v-for="product in limitedProducts" :key="product.id">
          <div class="card product-card h-100">
            <div class="badge bg-success position-absolute" style="top: 10px; right: 10px" v-if="isProductInCart(product.id)">
              In Cart: {{ getProductQuantity(product.id) }}
            </div>
            <img :src="product.image" class="card-img-top product-img" :alt="product.title" />
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description.substring(0, 60) }}...</p>

              <div class="ratings mb-2">
                <span class="text-warning">⭐</span> {{ product.rating.rate }} | {{ product.rating.count }} reviews
              </div>

              <div class="d-flex justify-content-between align-items-center mb-2">
                <p class="price mb-0">₹{{ product.price }}</p>
                <span class="text-muted small">Free shipping</span>
              </div>

              <div class="mt-auto d-flex justify-content-between">
                <router-link :to="'/product/' + product.id" class="btn btn-outline-primary btn-sm">View Details</router-link>
                <button 
                  @click="addToCart(product)" 
                  class="btn btn-primary btn-sm"
                  :disabled="addingToCart === product.id"
                >
                  <span v-if="addingToCart === product.id">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Adding...
                  </span>
                  <span v-else>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import products from '@/assets/products.json'
import NavBar from './NavBar.vue'
import cart from '@/store/cart'
import eventBus from '@/eventBus'
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
  components: { NavBar },
  data() {
    return {
      products,
      toastMessage: '',
      toast: null,
      addingToCart: null
    }
  },
  computed: {
    limitedProducts() {
      return this.products.slice(0, 10)
    }
  },
  mounted() {
    this.toast = new Toast(document.getElementById('liveToast'))
  },
  methods: {
    isProductInCart(productId) {
      return cart.getItems().some(item => item.id === productId)
    },
    getProductQuantity(productId) {
      const item = cart.getItems().find(item => item.id === productId)
      return item ? item.quantity : 0
    },
    async addToCart(product) {
      try {
        this.addingToCart = product.id
        
        // Simulate network delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 500))
        
        cart.addItem(product)
        eventBus.emit('cart-updated', cart.getCount())
        
        this.toastMessage = `${product.title} has been added to your cart!`
        this.toast.show()
        
        // Auto-hide toast after 3 seconds
        setTimeout(() => {
          this.toast.hide()
        }, 3000)
      } catch (error) {
        console.error('Error adding to cart:', error)
        this.toastMessage = 'Failed to add item to cart. Please try again.'
        this.toast.show()
      } finally {
        this.addingToCart = null
      }
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.7rem;
  color: #3b82f6;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #3b82f6;
  border-radius: 3px;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.product-img {
  height: 200px;
  object-fit: contain;
  padding: 15px;
  background-color: #f9fafb;
  border-bottom: 1px solid #eee;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  min-height: 48px;
}

.card-text {
  font-size: 0.9rem;
  color: #6b7280;
  min-height: 48px;
}

.ratings {
  font-size: 0.85rem;
  color: #f59e0b;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #10b981;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-outline-primary:hover {
  background-color: #3b82f6;
  color: white;
}

.btn-primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.badge {
  font-size: 0.7rem;
  padding: 0.35em 0.65em;
}
</style>