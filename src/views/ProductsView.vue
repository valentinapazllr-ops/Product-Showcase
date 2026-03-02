<script setup>
import { ref, computed } from "vue";
import ProductList from "../components/ProductList.vue";
import AddProductForm from "../components/AddProductForm.vue";

const searchQuery = ref("");
const selectedCategory = ref("Todas");
const categories = [
  "Todas",
  "Tecnología",
  "Audio",
  "Laptops",
  "Gadgets",
  "Casa y Jardín",
];
const showAddModal = ref(false);
const productToEdit = ref(null);

const handleEdit = (product) => {
  productToEdit.value = product;
  showAddModal.value = true;
};

const handleCloseModal = () => {
  showAddModal.value = false;
  productToEdit.value = null;
};
</script>

<template>
  <div class="products-view">
    <header class="view-header">
      <div class="header-top">
        <div class="header-content">
          <h1>Nuestros Productos</h1>
          <p>Explora nuestra selección completa de tecnología y hogar.</p>
        </div>
        <button @click="showAddModal = true" class="btn-add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14m-7-7v14" />
          </svg>
          {{ productToEdit ? "Editar Producto" : "Nuevo Producto" }}
        </button>
      </div>

      <div class="explore-controls">
        <div class="search-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="¿Qué estás buscando?"
          />
        </div>

        <div class="filter-box">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="['filter-btn', { active: selectedCategory === cat }]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </header>

    <section class="products-content">
      <ProductList
        :search="searchQuery"
        :category="selectedCategory"
        @edit="handleEdit"
      />
    </section>

    <AddProductForm
      v-if="showAddModal"
      :product-to-edit="productToEdit"
      @close="handleCloseModal"
    />
  </div>
</template>

<style scoped>
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
}

.btn-add:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
}

.btn-add svg {
  transition: transform 0.3s ease;
}

.btn-add:hover svg {
  transform: rotate(90deg);
}
.view-header {
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.header-content h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.75rem;
  letter-spacing: -0.04em;
}

.header-content p {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
}

.explore-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 0 1.25rem;
  max-width: 500px;
  transition: all 0.2s ease;
}

.search-box:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.search-box svg {
  color: #94a3b8;
}

.search-box input {
  padding: 1rem;
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1rem;
  color: #1e293b;
}

.search-box input:focus {
  outline: none;
}

.filter-box {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #cbd5e1;
  color: #1e293b;
}

.filter-btn.active {
  background: #0f172a;
  border-color: #0f172a;
  color: white;
}

@media (max-width: 768px) {
  .view-header {
    text-align: center;
    align-items: center;
  }

  .search-box {
    width: 100%;
  }

  .filter-box {
    justify-content: center;
  }
}
</style>
