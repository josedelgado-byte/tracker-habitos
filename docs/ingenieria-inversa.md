\# Ingeniería inversa — Lumina Habit



\- \*\*Sitio de referencia:\*\* https://shyamkanth.github.io/projects/lumina/

\- \*\*Rama de trabajo:\*\* `sprint-1/ingenieria-inversa`

\- \*\*Proyecto:\*\* Tracker de hábitos



\---



\## 1. Estructura



\### Hallazgo 1: Barra superior y vistas principales

\- \*\*Qué vi:\*\* La aplicación organiza la navegación superior con vistas para el seguimiento de hábitos, estadísticas y configuración.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Separaré con claridad las vistas de seguimiento diario, progreso/estadísticas y gestión de hábitos en `clon/`.

\- \*\*Captura:\*\* `!\[Estructura y navegación](capturas/01-elementos-estilos.png)`



\### Hallazgo 2: Íconos con texto de fuente afectados por traducción automática

\- \*\*Qué vi:\*\* Los íconos basados en texto se traducen o se superponen con letras cuando el navegador traduce la página o interpreta el texto interno.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* En `clon/` usaré íconos/etiquetas limpias y atributos adecuados para que no se rompan al traducir ni tapen el texto.

\- \*\*Captura:\*\* `!\[Íconos y estructura DOM](capturas/01-elementos-estilos.png)`



\### Hallazgo 3: Tarjetas de progreso y seguimiento diario

\- \*\*Qué vi:\*\* La interfaz muestra tarjetas con porcentaje de avance, racha y acciones para registrar el día.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Recrearé tarjetas claras para ver el avance del día y la racha sin saturar la pantalla.

\- \*\*Captura:\*\* `!\[Tarjetas en la vista](capturas/01-elementos-estilos.png)`



\---



\## 2. Sistema de diseño



\### Hallazgo 4: Tema oscuro con contraste de superficies y acento

\- \*\*Qué vi:\*\* Utiliza un fondo oscuro con paneles diferenciados y un color de acento brillante para resaltar estados activos.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Definiré una paleta propia para \*\*Tracker de hábitos\*\* cuidando el contraste entre fondo, tarjetas y botones.

\- \*\*Captura:\*\* `!\[Estilos y colores](capturas/01-elementos-estilos.png)`



\### Hallazgo 5: Jerarquía tipográfica y espaciado

\- \*\*Qué vi:\*\* Combina títulos grandes con etiquetas pequeñas en mayúsculas para distinguir títulos de métricas o ayudas.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Mantendré una jerarquía visual clara para leer rápido cada hábito y su estado.

\- \*\*Captura:\*\* `!\[Tipografía y espaciado](capturas/01-elementos-estilos.png)`



\### Hallazgo 6: Adaptación a pantallas de 375 px y 1280 px

\- \*\*Qué vi:\*\* Al cambiar el ancho de la pantalla, algunos elementos en fila requieren acomodo para verse cómodos en móvil y escritorio.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Probaré expresamente mis 3 pantallas de `clon/` en `375 px` (teléfono) y `1280 px` (computador).

\- \*\*Captura:\*\* `!\[Comportamiento en pantalla](capturas/01-elementos-estilos.png)`



\---



\## 3. Red (`Network`)



\### Hallazgo 7: Carga de archivos estáticos y recursos externos

\- \*\*Qué vi:\*\* En la pestaña `Network` al recargar se ven los archivos base del sitio junto con recursos externos (fuentes o estilos).

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Escribiré mi código en `clon/` con HTML, CSS y JavaScript puro desde cero, sin copiar archivos del sitio original.

\- \*\*Captura:\*\* `!\[Peticiones en Network](capturas/02-red.png)`



\### Hallazgo 8: Funcionamiento sin depender de un servidor backend propio

\- \*\*Qué vi:\*\* Las acciones en pantalla responden directamente en el navegador sin esperar respuestas de una API privada.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Haré que mis pantallas recreadas funcionen de forma local y fluida en el navegador.

\- \*\*Captura:\*\* `!\[Detalle de carga en Network](capturas/02-red.png)`



\---



\## 4. Estado (`Application` / `Local Storage`)



\### Hallazgo 9: Guardado de datos en `Local Storage`

\- \*\*Qué vi:\*\* En `Application -> Local Storage` se almacenan claves con los datos de hábitos y registros creados en el navegador.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Usaré esta observación para definir el modelo de datos inicial en `docs/PRD.md` y guardar el estado de mi app.

\- \*\*Captura:\*\* `!\[Claves en Local Storage](capturas/03-estado-localstorage.png)`



\### Hallazgo 10: Reflejo de cambios en pantalla y almacenamiento

\- \*\*Qué vi:\*\* Al crear o modificar hábitos, los datos guardados y lo que se muestra en pantalla cambian según la interacción.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Verificaré que agregar o marcar hábitos actualice bien la vista en las 3 pantallas.

\- \*\*Captura:\*\* `!\[Estado en Application](capturas/03-estado-localstorage.png)`



\---



\## 5. Lighthouse



\### Hallazgo 11: Medición inicial de Lighthouse

\- \*\*Qué vi:\*\* La auditoría inicial de Lighthouse reportó Rendimiento: `81`, Accesibilidad: `92`, Prácticas recomendadas: `100` y SEO: `80`.

\- \*\*Cómo lo usaré en Tracker de hábitos:\*\* Usaré estos puntajes como comparación ("antes") frente a mi versión mejorada en `clon/` ("después").

\- \*\*Captura:\*\* `!\[Puntajes iniciales de Lighthouse](capturas/04-lighthouse.png)`



\---



\## 6. Tres problemas a corregir en `clon/`



1\. Evitar que los íconos o textos se rompan o superpongan al traducir o con etiquetas de accesibilidad.

2\. Asegurar buena distribución y legibilidad tanto en `375 px` como en `1280 px`.

3\. Mejorar puntos de accesibilidad/rendimiento detectados frente al sitio original y comparar Lighthouse antes y después.

