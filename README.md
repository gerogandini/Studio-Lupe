# Lupé Studio — Solicitud de turnos

Página web para que las clientas de **Lupé Studio** puedan:

- Ver los servicios disponibles.
- Seleccionar uno o varios servicios.
- Indicar si necesitan retiro de un tratamiento anterior.
- Ver una duración estimada.
- Elegir un día de lunes a viernes.
- Elegir un horario entre 08:00 y 17:00.
- Generar automáticamente un mensaje de WhatsApp con toda la información.

## Importante

Esta versión **no utiliza base de datos** y no confirma turnos automáticamente.

La página funciona como un generador de solicitudes. La disponibilidad real, turnos repetidos y cancelaciones son gestionados por Lupé Studio por WhatsApp.

## Horarios

- Lunes a viernes.
- Atención: 08:00 a 18:00.
- Último horario de inicio mostrado: 17:00.

## Archivos

- `index.html` — estructura de la página.
- `styles.css` — diseño visual.
- `script.js` — selección de servicios, cálculo de duración y generación del mensaje de WhatsApp.
- `logo.jpeg` — logo proporcionado para Lupé Studio.

## Publicar en GitHub Pages

1. Crear un repositorio en GitHub.
2. Subir estos cuatro archivos.
3. Ir a **Settings → Pages**.
4. Seleccionar **Deploy from a branch**.
5. Elegir la rama `main` y la carpeta `/ (root)`.
6. Guardar.
7. Esperar unos minutos y abrir la URL de GitHub Pages.

## WhatsApp

El número configurado para las solicitudes es:

`+54 9 2215 45-3795`

El código lo transforma al formato internacional utilizado por WhatsApp:

`5492215453795`
