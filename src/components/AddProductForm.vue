<script setup>
import { onMounted } from "vue";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const emit = defineEmits(["close"]);
const props = defineProps({
  productToEdit: {
    type: Object,
    default: null,
  },
});

const product = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "Tecnología",
  image: "",
});

const loading = ref(false);
const error = ref("");

const categories = [
  "Tecnología",
  "Audio",
  "Laptops",
  "Gadgets",
  "Casa y Jardín",
];

onMounted(() => {
  if (props.productToEdit) {
    product.value = { ...props.productToEdit };
  }
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  try {
    if (props.productToEdit) {
      const productRef = doc(db, "products", props.productToEdit.id);
      const { id, createdAt, ...updateData } = product.value;
      await updateDoc(productRef, updateData);
    } else {
      await addDoc(collection(db, "products"), {
        ...product.value,
        createdAt: serverTimestamp(),
      });
    }
    emit("close");
  } catch (err) {
    error.value = "Error al guardar producto: " + err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="add-product-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Nuevo Producto</h2>
        <button @click="$emit('close')" class="btn-close">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-grid">
          <div class="form-group">
            <label>Nombre del Producto</label>
            <input
              v-model="product.name"
              type="text"
              placeholder="Ej: Nexus Phone G1"
              required
            />
          </div>

          <div class="form-group">
            <label>Categoría</label>
            <select v-model="product.category">
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Precio (CLP)</label>
            <input
              v-model.number="product.price"
              type="number"
              min="0"
              required
            />
          </div>

          <div class="form-group">
            <label>Stock Inicial</label>
            <input
              v-model.number="product.stock"
              type="number"
              min="0"
              required
            />
          </div>

          <div class="form-group full-width">
            <label>Descripción</label>
            <textarea
              v-model="product.description"
              placeholder="Describe brevemente el producto..."
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-group full-width">
            <label>URL de la Imagen</label>
            <input
              v-model="product.image"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              required
            />
          </div>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-cancel">
            Cancelar
          </button>
          <button type="submit" class="btn-save" :disabled="loading">
            {{ loading ? "Guardando..." : "Guardar Producto" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-product-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.4s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #94a3b8;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.full-width {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.error-msg {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-save {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
}

.btn-save:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .full-width {
    grid-column: span 1;
  }
}
</style>
