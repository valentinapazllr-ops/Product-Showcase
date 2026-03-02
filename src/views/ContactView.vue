<template>
  <div class="contact-view">
    <header class="view-header">
      <h1>Contáctanos</h1>
      <p>Estamos aquí para ayudarte. Ponte en contacto con nosotros.</p>
    </header>

    <div class="contact-content">
      <section class="contact-card">
        <h2>Información de Contacto</h2>
        <div class="contact-info">
          <div class="info-item">
            <span class="info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>hola@nexus.com</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📱</span>
            <div>
              <h3>Teléfono</h3>
              <p>+56 9 1234 5678</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div>
              <h3>Ubicación</h3>
              <p>Santiago, Chile</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-form-section">
        <h2>Envíanos un mensaje</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" placeholder="Tu nombre" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              rows="5"
              placeholder="¿Cómo podemos ayudarte?"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn-submit">Enviar Mensaje</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
const handleSubmit = () => {
  alert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.");
};
</script>

<style scoped>
.contact-view {
  padding-bottom: 4rem;
}

.view-header {
  margin-bottom: 4rem;
  text-align: center;
}

.view-header h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.view-header p {
  font-size: 1.25rem;
  color: #64748b;
}

.contact-content {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-card,
.contact-form-section {
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.contact-card h2,
.contact-form-section h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #0f172a;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-item h3 {
  font-size: 1.1rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: #64748b;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-submit {
  width: 100%;
  background: #0f172a;
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-submit:hover {
  background: #1e293b;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
