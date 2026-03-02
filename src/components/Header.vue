<script setup>
import { ref, onMounted } from "vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;

    // Si no hay usuario de Firebase, buscamos en localStorage el usuario demo
    if (!firebaseUser) {
      const demoUser = localStorage.getItem("demoUser");
      if (demoUser) {
        user.value = JSON.parse(demoUser);
      }
    }
  });
});

const handleLogout = async () => {
  await signOut(auth);
  localStorage.removeItem("demoUser"); // Limpiamos el usuario demo
  user.value = null;
  router.push("/login");
};
</script>

<template>
  <header class="main-header">
    <nav class="nav-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">Nexus</span>
          <span class="logo-dot">.</span>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/products" class="nav-link">Productos</router-link>
        <router-link to="/about" class="nav-link">Nosotros</router-link>
        <router-link to="/contact" class="nav-link">Contacto</router-link>
      </div>
      <div class="nav-actions">
        <template v-if="user">
          <div class="user-profile">
            <span class="user-email">{{ user.email }}</span>
            <button @click="handleLogout" class="btn-secondary">Salir</button>
          </div>
        </template>
        <div v-else class="guest-actions">
          <router-link to="/login" class="nav-link login-link"
            >Entrar</router-link
          >
          <router-link to="/products" class="btn-primary">Explorar</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  padding: 0.5rem 0; /* thinner header */
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  flex: 1; /* allow logo to take space on the left */
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.logo-text {
  color: #1e293b;
}

.logo-dot {
  color: #6366f1;
}

.nav-links {
  flex: 1; /* allow links to take space in the middle */
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.9rem; /* slightly smaller font */
  transition: all 0.2s ease;
  position: relative;
  padding-bottom: 0.25rem;
}

.nav-link:hover {
  color: #0f172a;
}

.nav-link.router-link-active {
  color: #6366f1;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6366f1;
}

.btn-primary {
  background: #0f172a;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.login-link {
  text-decoration: none;
  font-weight: 600;
}

.guest-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-email {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-secondary {
  background: transparent;
  color: #64748b;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #f8fafc;
  color: #0f172a;
}
</style>
