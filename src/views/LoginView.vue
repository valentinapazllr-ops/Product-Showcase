<script setup>
import { ref } from "vue";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLogin = ref(true);
const error = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  error.value = "";

  // Validación de contraseña: al menos 6 caracteres (coincide con Firebase)
  if (!/^.{6,}$/.test(password.value)) {
    error.value = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  loading.value = true;

  // MOCK LOGIN BYPASS: Si las llaves no están configuradas, permitimos entrar para probar el diseño
  if (auth.app.options.apiKey === "YOUR_API_KEY") {
    console.warn("Firebase no configurado. Iniciando sesión en MODO DEMO.");
    setTimeout(() => {
      // Guardamos un usuario ficticio en localStorage para que el router nos deje pasar
      localStorage.setItem(
        "demoUser",
        JSON.stringify({ email: email.value, isDemo: true }),
      );
      router.push("/");
      loading.value = false;
    }, 800);
    return;
  }

  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    } else {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    }
    router.push("/");
  } catch (err) {
    if (err.code === "auth/weak-password") {
      error.value = "La contraseña es débil. Usa al menos 6 caracteres.";
    } else if (err.code === "auth/invalid-credential") {
      error.value =
        "Credencial inválida. Revisa el método de autenticación (por ejemplo, Google Sign-In) y los dominios autorizados en Firebase.";
    } else {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    router.push("/");
  } catch (err) {
    if (err.code === "auth/invalid-credential") {
      error.value =
        "Error al iniciar con Google: credencial inválida. Revisa la configuración en Firebase Console.";
    } else {
      error.value = err.message;
    }
  }
};
</script>

<template>
  <div class="login-view">
    <div class="login-card">
      <div class="login-header">
        <h1>{{ isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta" }}</h1>
        <p>
          {{
            isLogin
              ? "Ingresa tus credenciales para continuar"
              : "Únete a la comunidad Nexus"
          }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña (Mínimo 6 caracteres)</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="······"
            minlength="6"
            required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</span>
        </button>
      </form>

      <div class="divider">
        <span>o continúa con</span>
      </div>

      <button @click="handleGoogleLogin" class="btn-google">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
        />
        Google
      </button>

      <div class="login-footer">
        <p>
          {{ isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?" }}
          <button @click="isLogin = !isLogin" class="btn-link">
            {{ isLogin ? "Regístrate aquí" : "Inicia sesión aquí" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #64748b;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-submit {
  background: #6366f1;
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 8px;
}

.divider {
  margin: 2rem 0;
  text-align: center;
  position: relative;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  position: relative;
  background: white;
  padding: 0 1rem;
  color: #94a3b8;
  font-size: 0.85rem;
}

.btn-google {
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-google:hover {
  background: #f8fafc;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #64748b;
}

.btn-link {
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
}

.btn-link:hover {
  text-decoration: underline;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
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
