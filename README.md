# 🚀 Aventura del Saber - 2º de Educación Primaria

Juego educativo web completo e interactivo para niños de 2º de Primaria (7-8 años), adaptado al currículo oficial LOMLOE. Incluye selector de asignaturas, explicaciones ilustradas con lectura en voz alta, minijuegos interactivos, cuestionarios tipo test con refuerzo positivo, tienda de mascotas y diploma descargable.

---

## 📁 Estructura del Código

El proyecto es una **aplicación web estática** (HTML5 + CSS3 + JavaScript moderno) que no requiere base de datos ni servidor complejo:

- `index.html`: Estructura principal y maquetación de la aplicación.
- `styles.css`: Estilos visuales infantiles, animaciones y botones 3D.
- `data.js`: Base de datos de contenidos (5 asignaturas, 25 temas, minijuegos y 125 preguntas).
- `sound.js`: Motor de efectos sonoros generados en tiempo real con Web Audio API (sin descargas).
- `app.js`: Lógica del juego, motor de minijuegos, sistema de puntuaciones, avatares y guardado local.
- `juego_completo.html`: Versión empaquetada "todo en uno" (single-file) ideal para abrir con doble clic sin internet.

---

## 🌐 Cómo Subir el Juego a Internet (Gratis y en 2 Minutos)

Al ser una aplicación web puramente estática, puedes publicarla en cualquiera de estos servicios gratuitos:

### Opción 1: Netlify Drop (La más rápida, sin saber programar)
1. Ve a [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Si tienes cuenta (o creas una gratis), simplemente arrastra la carpeta `aventura-primaria` (o el archivo `.zip`) a la ventana del navegador.
3. ¡Listo! En 5 segundos tendrás un enlace público HTTPS (ejemplo: `https://aventura-primaria.netlify.app`) para que cualquier niño juegue desde PC, tablet o móvil.

### Opción 2: GitHub Pages (Ideal si usas GitHub)
1. Crea un nuevo repositorio en [GitHub](https://github.com/new) llamado por ejemplo `aventura-primaria`.
2. Sube los archivos (`index.html`, `styles.css`, `data.js`, `sound.js`, `app.js`).
3. En GitHub, ve a **Settings** > **Pages**.
4. En **Branch**, selecciona `main` (o `master`) y guarda.
5. Tu juego estará disponible en `https://tu-usuario.github.io/aventura-primaria/`.

### Opción 3: Itch.io (Para portales de juegos infantiles)
1. Entra en [itch.io](https://itch.io) y pulsa en **Create new project**.
2. En *Kind of project*, selecciona **HTML** (Playable in browser).
3. Sube el archivo `aventura-segundo-primaria.zip`.
4. Marca la casilla *"This file will be played in the browser"*.
5. ¡Guarda y publica!

---

## 💻 Ejecución en Local

Si prefieres usarlo en casa sin subirlo a internet:
- **Doble clic**: Abre `juego_completo.html` directamente en tu navegador (Chrome, Edge, Firefox, Safari).
- **Servidor local**:
  ```bash
  python3 -m http.server 8080
  ```
  Y abre `http://localhost:8080` en tu navegador.
