<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <main class="content-area">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap");

:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --bg-gradient:
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.04) 0, transparent 50%),
    radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.04) 0, transparent 50%);
  --text-main: #0f172a;
  --text-muted: #64748b;
  --card-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Outfit", sans-serif;
}

body {
  background: #f8fafc;
  color: var(--text-main);
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-gradient);
}

.content-area {
  flex-grow: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
  border: 3px solid #f1f5f9;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
