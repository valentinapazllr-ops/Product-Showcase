# Guía: Desplegar a GitHub Pages

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Asigna nombre al repositorio (ej: `Product-Showcase`)
3. Selecciona "Public" (necesario para GitHub Pages en cuentas gratuitas)
4. NO inicialices con README, .gitignore, o licencia
5. Haz clic en "Create repository"

## Paso 2: Conectar tu Repositorio Local

En PowerShell, en la carpeta del proyecto:

```powershell
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

Reemplaza:
- `TU_USUARIO`: Tu nombre de usuario en GitHub
- `TU_REPOSITORIO`: El nombre que asignaste al repositorio

## Paso 3: Configurar GitHub Pages

### Opción A: Deploy desde rama `main` (Recomendado para SPAs)

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú de la izquierda, selecciona **Pages**
4. En "Source", selecciona `Deploy from a branch`
5. Selecciona rama: `main` y carpeta: `/ (root)`
6. Haz clic en **Save**

**Importante para SPAs en Vue**: GitHub Pages necesita que redirija URLs no encontradas al `index.html`. Hay dos formas:

#### Solución 1: Añadir `public/404.html` (Recomendada)

GitHub Pages automáticamente usa `404.html` para redireccionar. Crea este archivo:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
<head>
    <script>
        // Guarda la ubicación original
        sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;url=/" />
</head>
<body>
</body>
</html>
```

#### Solución 2: Modificar `src/main.js` para manejar rutas

Si no quieres usar `404.html`, asegúrate de que tu `src/router/index.js` tenga una ruta fallback:

```javascript
// Al final del archivo de configuración de rutas
{
  path: '/:pathMatch(.*)*',
  redirect: '/'
}
```

### Opción B: Deploy con GitHub Actions (Avanzado)

Si prefieres automatizar los builds y deploys, crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: tu-dominio.com  # Opcional: si tienes dominio personalizado
```

## Paso 4: Ajustar Configuración de Vite (Opcional)

Si tu repositorio NO está en la raíz de GitHub (ej: `github.com/usuario/Product-Showcase`), necesitas cambiar la base URL en `vite.config.js`:

```javascript
// vite.config.js
export default {
  base: '/Product-Showcase/',  // Nombre de tu repositorio
  plugins: [vue()],
}
```

Si el repositorio está bajo tu perfil como página principal (ej: `usuario.github.io`), dejalo como:

```javascript
export default {
  base: '/',
  plugins: [vue()],
}
```

## Paso 5: Hacer Push y Esperar Deploy

Después de configurar GitHub Pages:

```powershell
# Si hiciste cambios en vite.config.js o 404.html:
npm run build
git add .
git commit -m "config: Setup for GitHub Pages deployment"
git push origin main
```

GitHub automáticamente detectará los cambios en `main` y desplegará.

## Verificar Deploy

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** > **Pages**
3. Verás la URL derivada pública (ej: `https://tu-usuario.github.io/Product-Showcase/`)
4. Espera 1-2 minutos y abre la URL para verificar

## Troubleshooting

### ❌ Veo "404 - File not found"

**Solución**: 
- Verifica que `public/404.html` exista en tu repositorio
- O asegúrate de que tu router de Vue tenga una ruta fallback (`path: '/:pathMatch(.*)*'`)

### ❌ Los estilos se ven rotos

**Solución**:
- Verifica que `vite.config.js` tenga la `base` correcta
- Reconstruye: `npm run build`
- Haz push nuevamente: `git push origin main`

### ❌ Las rutas no funcionan

**Solución**:
- Asegúrate de estar usando `vue-router` correctamente
- El historyMode en router podría necesitar ajustes si no tienes un servidor backend

## Resumen Rápido

| Paso | Comando/Acción |
|------|---|
| 1 | Crear repo en GitHub |
| 2 | `git remote add origin <url>` \| `git push -u origin main` |
| 3 | Settings > Pages > Deploy from `main` branch |
| 4 | (Opcional) Crear `public/404.html` o ajustar `vite.config.js` |
| 5 | Ir a `https://tu-usuario.github.io/tu-repo/` |

---

**Nota**: El proyecto ya está configurado con Firebase Hosting y listo para GitHub. Simplemente sigue estos pasos para agregar GitHub Pages como opción adicional.
