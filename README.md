# Lectura y Pensamiento Crítico

Plataforma web del curso virtual **Lectura y Pensamiento Crítico** del CRAI (Centro de Recursos para el Aprendizaje y la Investigación) de la Universidad Autónoma de Occidente (UAO). Está dirigida a estudiantes de primeros semestres.

- **8 semanas · 4 módulos:** lectura crítica, texto expositivo, texto argumentativo y texto literario.
- **Lecturas:** Libby (libros), eLibro (libros académicos) y Pasa la Página (revistas).
- **Actividades por semana:** contenido, quiz autocalificable, bitácora de lectura, foros, talleres y proyecto final (ensayo crítico).
- **Seguimiento:** el progreso de cada estudiante, el autodiagnóstico de competencias y un código de reporte que el docente carga en el **Panel docente**.

Es un sitio estático: HTML, CSS y JavaScript sin dependencias ni paso de compilación.

## Estructura

```
index.html          Página principal
css/estilos.css     Estilos (identidad visual UAO)
js/datos.js         Contenido del curso: semanas, lecturas, quizzes, rúbricas, facultades y programas
js/marca.js         Logotipo «uao» en vector
js/app.js           Lógica de la plataforma (navegación, progreso, quizzes, panel docente)
assets/uao.svg      Logotipo «uao» (Manual de Identidad UAO, julio 2026)
assets/favicon.svg  Ícono de pestaña
```

## Publicar con GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta, con `index.html` en la raíz.
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
4. En uno o dos minutos el sitio queda disponible en `https://<usuario>.github.io/<repositorio>/`.

Desde la línea de comandos:

```bash
git init
git add .
git commit -m "Plataforma Lectura y Pensamiento Crítico"
git branch -M main
git remote add origin https://github.com/<usuario>/<repositorio>.git
git push -u origin main
```

Para probarlo localmente basta con abrir `index.html` en el navegador o ejecutar `python3 -m http.server` en esta carpeta.

## Editar el contenido

Todo el contenido académico está en `js/datos.js`:

| Qué cambiar | Dónde |
|---|---|
| Enlace a Libby de la biblioteca | `LIBBY_KEY` (identificador de la biblioteca en Libby) |
| Búsqueda en eLibro | `ELIBRO_SEARCH` (URL; usa `{q}` para el término de búsqueda) |
| Acceso a Pasa la Página | `PASA_URL` |
| Facultades y programas | `FACULTADES`, `PROGRAMAS` |
| Semanas, lecturas, actividades y quizzes | `SEMANAS` |
| Pesos de evaluación | `PESOS` |
| Rúbricas | `RUBRICAS` |
| Novelas del proyecto final | `NOVELAS` |

## Datos y privacidad

- El sitio no usa servidor ni base de datos. El progreso de cada estudiante se guarda en el `localStorage` de **su propio navegador** y en **ese dominio**.
- Si el estudiante cambia de equipo, de navegador o de dirección del sitio, puede trasladar su avance con **Mi progreso → Copiar código de reporte** y luego **Restaurar desde un código**.
- El docente pega los códigos de reporte en **Panel docente**. Se procesan solo en su navegador y no se envían a ningún lugar.

## Identidad visual

El sitio aplica el *Manual de Identidad UAO (julio 2026)* como marca de **Órbita 1**: identidad UAO y un descriptor genérico del curso, sin logotipo propio.

- **Colores:** rojo principal `#FF051E` y crema `#FBF5EC`; subordinados `#AC0B32`, `#8A1428` y `#FF836C`.
- **Tipografía:** DM Sans.
- **Arco de la portada:** construido según las páginas 50 y 51 del manual.

Los logotipos son propiedad de la Universidad Autónoma de Occidente. Su uso está sujeto al manual de identidad institucional.

---
CRAI · Universidad Autónoma de Occidente
