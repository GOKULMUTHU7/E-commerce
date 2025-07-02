<template>
  <div>
    <NavBar />
    <div class="container my-5">
      <h2 class="text-center mb-4 title">Top Selling Products</h2>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="product in limitedProducts" :key="product.id">
          <div class="card product-card h-100">
            <img :src="product.image" class="card-img-top product-img" :alt="product.title" />
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description.substring(0, 60) }}...</p>

              <div class="ratings mb-2">
                ⭐ {{ product.rating.rate }} | {{ product.rating.count }} reviews
              </div>

              <p class="price mb-2">₹{{ product.price }}</p>

              <div class="mt-auto d-flex justify-content-between">
                <router-link :to="'/product/' + product.id" class="btn btn-outline-primary btn-sm">View</router-link>
                <button @click="addToCart(product)" class="btn btn-primary btn-sm">Add to Cart</button>
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

export default {
  components: { NavBar },
  data() {
    return {
      products
    }
  },
  computed: {
    limitedProducts() {
      return this.products.slice(0, 10)
    }
  },
  methods: {
    addToCart(product) {
      cart.addItem(product)
      eventBus.emit('cart-updated', cart.getCount()) 
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.7rem;
  color: #3b82f6;
  font-weight: 600;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
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
}
</style>
