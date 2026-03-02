<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-info">
        <div class="logo">
          <span class="logo-text">Nexus</span>
          <span class="logo-dot">.</span>
        </div>
        <p>
          Elevando la experiencia de descubrimiento de productos con diseño y
          tecnología.
        </p>
      </div>
      <div class="footer-links">
        <div class="link-group">
          <h4>Plataforma</h4>
          <a href="#">Catálogo</a>
          <a href="#">Ofertas</a>
          <a href="#">Novedades</a>
        </div>
        <div class="link-group">
          <h4>Compañía</h4>
          <a href="#">Sobre nosotros</a>
          <a href="#">Contacto</a>
          <a href="#">Blog</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Nexus Product Showcase. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background: white; /* Clean white background instead of gray */
  border-top: 1px solid #f1f5f9;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1280px; /* Match global max width */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
}

.footer-info p {
  margin-top: 0.5rem;
  color: #64748b;
  max-width: 300px;
  line-height: 1.6;
  font-size: 0.9rem; /* Slightly smaller text */
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.25rem; /* Slightly smaller logo in footer */
  font-weight: 800;
}

.logo-text {
  color: #1e293b;
}

.logo-dot {
  color: #6366f1;
}

.footer-links {
  display: flex;
  justify-content: flex-end;
  gap: 4rem;
}

.link-group h4 {
  color: #0f172a;
  margin-bottom: 1.25rem;
  font-size: 0.95rem; /* Smaller, bolder headers */
  font-weight: 700;
}

.link-group a {
  display: block;
  color: #64748b;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.85rem; /* Smaller links */
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: #6366f1;
}

.footer-bottom {
  max-width: 1280px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links {
    justify-content: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }
}
</style>
