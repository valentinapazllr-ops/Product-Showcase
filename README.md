# Product Showcase

Una aplicación Vue 3 + Vite para mostrar productos con autenticación Firebase y hosting en Firebase y GitHub Pages.

## 🚀 Características

- **Vue 3** con `<script setup>` (SFCs)
- **Vite** para desarrollo y build rápido
- **Vue Router** para navegación
- **Firebase Authentication** (Email/Password, Google Sign-In)
- **Firestore** para base de datos
- **Firebase Hosting** (actualmente deployado)
- **GitHub Pages** (listo para configurar)
- **Responsive Design** con CSS moderno

## 📋 Sitios Desplegados

- **Firebase Hosting**: https://products-showcase-c4a87.web.app
- **GitHub Pages**: (ver instrucciones abajo)

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone <tu-repositorio-url>
cd Product\ Showcase

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview

# Tomar captura de pantalla del login
npm run screenshot

# Desplegar a Firebase Hosting (requiere autenticación)
npm run deploy
```

## 🔐 Configuración de Firebase

El proyecto ya tiene configurado Firebase con:
- **Project ID**: `products-showcase-c4a87`
- **Authentication**: Email/Password y Google Sign-In
- **Firestore**: Base de datos para productos

Credenciales en: `src/firebase/config.js`

## 📤 Subir a GitHub

1. **Crear repositorio en GitHub**:
   - Ve a https://github.com/new
   - Asigna nombre al repositorio (ej: `Product-Showcase`)
   - Marca "Public" o "Private" según prefieras
   - **NO** inicialices con README (ya tenemos uno)
   - Crea el repositorio

2. **Conectar con tu repositorio**:
```bash
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

3. **Verificar push**:
```bash
git log --oneline
git remote -v
```

## 🌐 Configurar GitHub Pages

### Opción 1: Deployar desde rama `main` (recomendado)

1. Ve a tu repositorio en GitHub
2. Settings > Pages
3. En "Source" selecciona `Deploy from a branch`
4. Selecciona rama `main` y carpeta `/ (root)`
5. Guarda cambios

**Nota**: Para que funcione GitHub Pages con una SPA en Vue, necesitas un archivo `public/_redirects` o configurar un `404.html`. El proyecto ya tiene `firebase.json` configurado; para GitHub Pages, necesitaremos un ajuste.

### Opción 2: Usar GitHub Actions (más avanzado)

Crearía un action que construya el proyecto y lo despliegue automáticamente.

## 🔧 Estructura del Proyecto

```
Product Showcase/
├── src/
│   ├── components/        # Componentes Vue reutilizables
│   ├── views/            # Páginas de la aplicación
│   ├── router/           # Configuración de rutas
│   ├── firebase/         # Configuración de Firebase
│   ├── assets/           # Estilos e imágenes
│   ├── App.vue
│   └── main.js
├── scripts/
│   └── screenshot.js     # Script para capturar pantallas
├── public/               # Archivos estáticos
├── firebase.json         # Config Firebase Hosting
├── vite.config.js        # Config Vite
├── package.json
└── README.md
```

## 🚨 Validación de Contraseña

- **Mínimo**: 6 caracteres
- **Tipo**: Cualquier carácter (letras, números, símbolos)
- Los campos tienen validación frontend y backend (Firebase)

## 📸 Captura de Pantalla del Login

Se genera automáticamente con:
```bash
npm run screenshot
```

Panel de login guardado en: `screenshots/login.png`

## 📝 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye la app para producción |
| `npm run preview` | Previsualiza el build localmente |
| `npm run deploy` | Despliega a Firebase Hosting |
| `npm run screenshot` | Genera captura de zona de login |

## 🤝 Contribuciones

Eres libre de hacer fork, clonar y personalizar este proyecto.

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales.

---

**Creado**: Marzo 2026  
**Última actualización**: Marzo 2, 2026
