<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import ProductCard from "./ProductCard.vue";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "Todas",
  },
});

const emit = defineEmits(["edit"]);

const products = ref([]);
const loading = ref(true);
let unsubscribe = null;
let fallbackTimer = null;

const loadMockData = () => {
  products.value = [
    {
      id: "1",
      name: "Nexus Watch Pro",
      description: "El smartwatch más avanzado con pantalla AMOLED.",
      price: 299990,
      category: "Tecnología",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      stock: 15,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "SonicBuds Air",
      description: "Audio espacial y cancelación activa de ruido.",
      price: 159990,
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      stock: 3,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Lumina Laptop 14",
      description: "Ligera, potente y con batería para todo el día.",
      price: 899990,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      stock: 8,
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Vision Glass S",
      description: "Realidad aumentada en tiempo real para tu día a día.",
      price: 899990,
      category: "Gadgets",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      stock: 12,
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Set de Herramientas Premium",
      description: "Kit completo para mantenimiento del hogar y jardín.",
      price: 45990,
      category: "Casa y Jardín",
      image:
        "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=500",
      stock: 20,
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Maceta Autorregable",
      description: "Sistema inteligente para el cuidado de tus plantas.",
      price: 12990,
      category: "Casa y Jardín",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
      stock: 50,
      createdAt: new Date(),
    },
  ];
  loading.value = false;
};

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      (product.name?.toLowerCase() || "").includes(
        props.search.toLowerCase(),
      ) ||
      (product.description?.toLowerCase() || "").includes(
        props.search.toLowerCase(),
      );
    const matchesCategory =
      props.category === "Todas" || product.category === props.category;

    return matchesSearch && matchesCategory;
  });
});

onMounted(() => {
  loading.value = true;

  // Si Firestore tarda o hay un problema de permisos, cargamos mock tras timeout
  fallbackTimer = setTimeout(() => {
    if (loading.value) {
      console.warn("Firestore tardó en responder. Cargando datos de prueba.");
      loadMockData();
    }
  }, 2500);

  // Intentamos suscribirnos a la colección en Firestore
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Si hay documentos, usamos los reales
        if (snapshot.docs.length > 0) {
            products.value = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          } else {
            // Si la colección está vacía, cargamos datos de ejemplo
            loadMockData();
          }
        loading.value = false;
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
      },
      (error) => {
        console.error("Error fetching products:", error);
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
        // Mostrar datos mock en caso de error de lectura
        loadMockData();
      },
    );
  } catch (err) {
    console.error("Firestore subscription failed:", err);
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    loadMockData();
  }
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (fallbackTimer) clearTimeout(fallbackTimer);
});
</script>

<template>
  <div class="product-list-container">
    <div v-if="loading" class="loading-state">
      <div class="loader"></div>
      <p>Buscando las mejores ofertas...</p>
    </div>
    <div v-else-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @edit="$emit('edit', $event)"
      />
    </div>
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No encontramos productos</h3>
      <p>Intenta ajustar tu búsqueda o filtros.</p>
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  padding: 2rem 0;
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 24px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}
</style>
