# PRD · Tracker de hábitos

> Documento de requisitos del producto (Product Requirements Document).
> Complétalo en el Sprint 0 (historia H0.3) y pide la aprobación del profesor en un Issue.
> Cada requisito funcional (RF) se convierte en un Issue con la plantilla "Historia de usuario".

| Campo | Valor |
| --- | --- |
| Alumno | José Humberto Delgado López |
| Proyecto n.º | Tracker de hábitos |
| Sitio de referencia | Habitica / GitHub Contributions |
| Compañero revisor | Jeisonpernia |
| URL desplegada | (se completa en el Sprint 5) |

## 1. Problema

Las personas que intentan construir rutinas diarias suelen abandonarlas tras pocos días porque no ven su progreso acumulado de forma visual ni miden con claridad su constancia. Sin un registro ágil del día a día y métricas de continuidad, mantener el hábito en el tiempo resulta difícil.

## 2. Usuarios

- **Usuario principal:** Estudiantes y personas que buscan crear o mantener hábitos diarios y revisar su constancia desde computadora o teléfono móvil.
- **Usuario secundario:** Compañeros o revisores que inspeccionan el avance y el funcionamiento del producto.

## 3. Objetivo y métrica de éxito

«Un usuario registra o marca el cumplimiento de un hábito diario en menos de 5 segundos y ve actualizada su racha y su mapa de calor anual».

## 4. Alcance del MVP

Funcionalidades que SÍ entran este semestre:

1. Gestión de hábitos (crear, editar, listar, archivar y eliminar).
2. Registro diario de cumplimiento por fecha.
3. Cálculo de racha actual y racha máxima.
4. Mapa de calor anual en HTML5 Canvas.
5. Resumen de cumplimiento y métricas básicas.

### Funcionalidades -> carpetas de `src/` (screaming architecture)

| Funcionalidad | Carpeta |
| --- | --- |
| Gestión de hábitos | `src/habits` |
| Registro diario | `src/checkins` |
| Cálculo de rachas | `src/streaks` |
| Mapa de calor en Canvas | `src/heatmap` |
| Resumen y métricas | `src/stats` |

## 5. Fuera de alcance

Lo que NO se construye en el MVP:

- Aplicaciones nativas para iOS o Android.
- Integración con relojes inteligentes o wearables externos.
- Funciones sociales de chat o apuestas entre usuarios.

## 6. Requisitos funcionales

| ID | Requisito | Prioridad (alta, media, baja) |
| --- | --- | --- |
| RF-01 | Crear, editar y eliminar hábitos diarios | alta |
| RF-02 | Marcar y desmarcar hábitos completados por día | alta |
| RF-03 | Calcular racha actual y racha máxima por hábito | alta |
| RF-04 | Renderizar mapa de calor anual en HTML5 Canvas | alta |
| RF-05 | Consultar resumen y porcentajes de cumplimiento | media |

## 7. Requisitos no funcionales

- Responsive, móvil primero (375 px y 1280 px).
- Lighthouse >= 90 en Accesibilidad y Buenas prácticas.
- 0 errores en la consola del navegador.
- Funciona con 10.000 registros sin congelarse.

## 8. Modelo de datos

```mermaid
erDiagram
  HABIT ||--o { HABIT_LOG : registra }
  HABIT {
    int id PK
    text title
    text category
    int daily_target
    boolean active
  }
  HABIT_LOG 
    int id PK
    int habit_id FK
    date log_date
    int completed_count