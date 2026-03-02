import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },
    { path: "/products", name: "products", component: ProductsView, meta: { requiresAuth: true } },
    { path: "/about", name: "about", component: AboutView, meta: { requiresAuth: true } },
    { path: "/contact", name: "contact", component: ContactView, meta: { requiresAuth: true } },
    { path: "/login", name: "login", component: LoginView },
  ],
});

// Guard de navegación
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const firebaseUser = await getCurrentUser();
    const demoUser = localStorage.getItem('demoUser');
    
    if (firebaseUser || demoUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
