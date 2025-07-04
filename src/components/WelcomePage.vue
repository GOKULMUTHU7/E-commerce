<template>
  <div class="welcome-page">
    <NavBar />
    <div class="hero-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-center">

      <div class="text-section text-center text-lg-start p-4 p-lg-5">
        <h1 class="headline mb-3">Welcome to <span class="highlight">GokulZone</span></h1>
        <p class="subtext">Where great deals meet great quality – shop smarter with exclusive offers.</p>
        <router-link to="/product-list" class="btn btn-start mt-4">Shop Now</router-link>
      </div>

      <div class="image-section p-4 p-lg-5">
        <img
          src="https://img.freepik.com/free-vector/worldwide-shipping-service-international-distribution-collaborative-logistics-supply-chain-partners-freight-cost-optimization-concept-pinkish-coral-bluevector-isolated-illustration_335657-1757.jpg?semt=ais_hybrid&w=740"
          alt="Shopping Illustration"
          class="img-fluid hero-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style scoped>
.welcome-page {
  background: linear-gradient(135deg, #f0f4ff, #e6ecff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


.hero-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(90vh); 
  padding-top: 2rem;
  padding-bottom: 2rem;
}


.text-section {
  flex: 1;
  max-width: 600px;
}

.headline {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Poppins', sans-serif;
}

.highlight {
  color: #4f46e5;
  text-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

.subtext {
  font-size: 1.2rem;
  color: #4b5563;
  margin-top: 1rem;
  font-weight: 500;
  line-height: 1.6;
}

.btn-start {
  background: linear-gradient(to right, #4f46e5, #6366f1);
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.2);
  transition: 0.3s ease;
}

.btn-start:hover {
  background: linear-gradient(to right, #4338ca, #4f46e5);
  transform: translateY(-2px);
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
  animation: floatUp 4s ease-in-out infinite;
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .headline {
    font-size: 2.2rem;
  }

  .subtext {
    font-size: 1rem;
  }

  .btn-start {
    font-size: 0.95rem;
    padding: 0.6rem 1.5rem;
  }
}
</style>
