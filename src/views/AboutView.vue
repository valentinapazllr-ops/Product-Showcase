<template>
  <div class="about-view">
    <header class="view-header">
      <h1>Sobre Nexus</h1>
      <p>Redefiniendo el estándar de excelencia en productos digitales.</p>
    </header>

    <div class="about-content">
      <section class="mission-section">
        <div class="mission-card">
          <h2>Nuestra Misión</h2>
          <p>
            En Nexus, nos dedicamos a curar y presentar los productos más
            innovadores del mercado, combinando funcionalidad de vanguardia con
            una estética impecable. Creemos que la tecnología debe ser tanto una
            herramienta como una obra de arte.
          </p>
        </div>
      </section>

      <section class="values-grid">
        <div class="value-item">
          <div class="value-icon">✨</div>
          <h3>Innovación</h3>
          <p>Buscamos constantemente lo último en tecnología y diseño.</p>
        </div>
        <div class="value-item">
          <div class="value-icon">🎯</div>
          <h3>Calidad</h3>
          <p>
            Cada producto en nuestro catálogo ha sido seleccionado con rigor.
          </p>
        </div>
        <div class="value-item">
          <div class="value-icon">🤝</div>
          <h3>Confianza</h3>
          <p>Tu satisfacción y seguridad son nuestra máxima prioridad.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-view {
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

.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.mission-section {
  margin-bottom: 4rem;
}

.mission-card {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.mission-card h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.mission-card p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-item {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.value-item h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}

.value-item p {
  color: #64748b;
  line-height: 1.6;
}
</style>
