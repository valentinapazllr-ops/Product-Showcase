<script setup>
import ProductList from "../components/ProductList.vue";
</script>

<template>
  <div class="home-view">
    <header class="hero">
      <h1>Descubre la Innovación</h1>
      <p>Explora productos diseñados para el futuro, hoy mismo.</p>
    </header>

    <section class="products-section">
      <div class="section-header">
        <h2>Productos Destacados</h2>
        <div class="divider"></div>
      </div>
      <ProductList />
    </section>
  </div>
</template>

<style scoped>
.home-view {
  padding-bottom: 4rem;
}

.hero {
  text-align: center;
  padding: 6rem 2rem;
  background: #f8f8fb; /* light purpleish gray from the image */
  border-radius: 24px;
  margin-bottom: 5rem;
}

.hero h1 {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #4b4faa; /* Dark blue/purple from the image */
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.15rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
}

.section-header {
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.divider {
  width: 60px;
  height: 4px;
  background: #6366f1;
  border-radius: 99px;
}
</style>
