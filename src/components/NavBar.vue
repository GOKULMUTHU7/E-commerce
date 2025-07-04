<template>
  <nav class="glass-navbar">
    <div class="nav-container">
      <router-link class="logo" to="/">
        <i class="fa-solid fa-seedling"></i> GokulZone
      </router-link>

      <button class="menu-toggle" @click="isCollapsed = !isCollapsed">
        <span :class="{ open: isCollapsed }" class="menu-icon"></span>
      </button>

      <div class="nav-links" :class="{ open: isCollapsed }">
        <router-link class="nav-item" to="/">Home</router-link>
        <router-link class="nav-item" to="/product-list">Products</router-link>
        <router-link class="nav-item cart" to="/cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-text">Cart</span>
          <span class="badge">{{ cartCount }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import eventBus from '@/eventBus'
import cart from '@/store/cart'

export default {
  setup() {
    const cartCount = ref(cart.getCount())
    const isCollapsed = ref(false)

    const updateCart = (newCount) => {
      cartCount.value = newCount
    }

    onMounted(() => {
      eventBus.on('cart-updated', updateCart)
    })

    onBeforeUnmount(() => {
      eventBus.off('cart-updated', updateCart)
    })

    return { cartCount, isCollapsed }
  }
}
</script>

<style scoped>
/* Navbar Container */
.glass-navbar {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

/* Flex Layout */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand Logo */
.logo {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1e3a8a;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}

.logo:hover {
  color: #2563eb;
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  color: #334155;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #e0f2fe;
  color: #0369a1;
}

/* Cart */
.cart {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cart-text {
  margin-left: 4px;
}

.badge {
  background-color: #f43f5e;
  color: #fff;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Toggle Button */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-icon {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #0f172a;
  position: relative;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background-color: #0f172a;
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -7px;
}

.menu-icon::after {
  top: 7px;
}

.menu-icon.open {
  background-color: transparent;
}

.menu-icon.open::before {
  transform: rotate(45deg);
  top: 0;
}

.menu-icon.open::after {
  transform: rotate(-45deg);
  top: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    background-color: #f9fafb;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease;
    z-index: 998;
  }

  .nav-links.open {
    transform: scaleY(1);
  }

  .nav-item {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
