<script setup>
import { ref, onMounted } from "vue";
import { db, auth } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit"]);

const user = ref(null);
const isPurchasing = ref(false);
const showSuccess = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });
});

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);
};

const handleDelete = async () => {
  if (confirm(`¿Estás seguro de eliminar "${props.product.name}"?`)) {
    try {
      await deleteDoc(doc(db, "products", props.product.id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  }
};

const handlePurchase = () => {
  if (props.product.stock <= 0) return;

  isPurchasing.value = true;
  // Simulating purchase process
  setTimeout(() => {
    isPurchasing.value = false;
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }, 800);
};

const getStockClass = (stock) => {
  if (stock <= 0) return "stock-out";
  if (stock < 5) return "stock-low";
  return "stock-high";
};

const getStockLabel = (stock) => {
  if (stock <= 0) return "Agotado";
  if (stock < 5) return `¡Últimas ${stock} unidades!`;
  return `${stock} disponibles`;
};
</script>

<template>
  <div class="product-card" :class="{ 'out-of-stock': product.stock <= 0 }">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <span class="category-badge">{{ product.category }}</span>
      <div v-if="showSuccess" class="purchase-overlay">
        <div class="success-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>¡Añadido!</span>
        </div>
      </div>
    </div>
    <div class="product-details">
      <div class="details-top">
        <h3 class="product-title">{{ product.name }}</h3>
        <span class="stock-badge" :class="getStockClass(product.stock)">
          {{ getStockLabel(product.stock) }}
        </span>
      </div>
      <p class="product-description">{{ product.description }}</p>

      <div class="product-actions">
        <div class="price-container">
          <span class="price-label">Precio</span>
          <span class="product-price">{{ formatPrice(product.price) }}</span>
        </div>
        <button
          @click="handlePurchase"
          class="btn-buy"
          :disabled="product.stock <= 0 || isPurchasing"
        >
          <span v-if="isPurchasing" class="spinner"></span>
          <span v-else>{{
            product.stock > 0 ? "Comprar ahora" : "Agotado"
          }}</span>
        </button>

        <button
          v-if="user"
          @click="$emit('edit', product)"
          class="btn-edit"
          title="Editar Producto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          v-if="user"
          @click="handleDelete"
          class="btn-delete"
          title="Eliminar Producto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border-color: #6366f1;
}

.product-card.out-of-stock {
  opacity: 0.8;
}

.product-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f1f5f9;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.85rem;
  border-radius: 99px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid rgba(99, 102, 241, 0.2);
  z-index: 2;
}

.purchase-overlay {
  position: absolute;
  inset: 0;
  background: rgba(99, 102, 241, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeIn 0.3s ease;
}

.success-message {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.product-details {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.details-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}

.stock-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
}

.stock-high {
  background: #f0fdf4;
  color: #15803d;
}
.stock-low {
  background: #fffbeb;
  color: #b45309;
}
.stock-out {
  background: #fef2f2;
  color: #b91c1c;
}

.product-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.btn-buy {
  flex-grow: 1;
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-buy:hover:not(:disabled) {
  background: #1e293b;
  transform: translateY(-1px);
}

.btn-delete {
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fee2e2;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-delete:hover {
  background: #fee2e2;
  transform: scale(1.05);
}

.btn-edit {
  background: #f0f9ff;
  color: #0ea5e9;
  border: 1px solid #e0f2fe;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: #e0f2fe;
  transform: scale(1.05);
}

.btn-purchase {
  background: #0f172a;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

.btn-purchase:hover:not(:disabled) {
  background: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
}

.btn-purchase:active:not(:disabled) {
  transform: translateY(0);
}

.btn-purchase:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
