# Dataset Sintético de Prueba: Plataforma BookCross

Este directorio describe el conjunto de datos de prueba cargado en Neo4j mediante el script `scripts/02-carga-datos.md`. El dataset está diseñado para permitir pruebas realistas de recomendaciones sociales, emparejamiento de clubes y algoritmos de camino más corto (`shortestPath`) para préstamos físicos entre usuarios.

## Resumen Cuantitativo del Grafo

| Tipo de Elemento | Etiqueta / Tipo | Cantidad | Descripción |
| :--- | :--- | :--- | :--- |
| **Nodos** | `:Lector` | 5 | Lectores de la red con estado de cuenta y ciudad de residencia. |
| **Nodos** | `:Libro` | 7 | Obras con ISBN, páginas, año de publicación y título. |
| **Nodos** | `:Autor` | 5 | Escritores con nacionalidad y año de nacimiento. |
| **Nodos** | `:Genero` | 4 | Clasificaciones literarias temáticas. |
| **Nodos** | `:Club` | 2 | Comunidades temáticas con lectura mensual fijada. |
| **Total Nodos** | | **23** | Cumple el mínimo exigido (≥15 nodos). |
| **Relaciones** | `[:ESCRIBIO]` | 7 | Asignación de autor a libro. |
| **Relaciones** | `[:PERTENECE_A]` | 8 | Asignación de libros a géneros literarios. |
| **Relaciones** | `[:SIGUE_A]` | 5 | Red social y de confianza entre lectores. |
| **Relaciones** | `[:LEYO]` | 9 | Valoraciones (1-5 estrellas), favoritos y fechas de lectura. |
| **Relaciones** | `[:PRESTA]` | 4 | Ejemplares físicos disponibles con ciudad de recogida. |
| **Relaciones** | `[:MIEMBRO_DE]` | 4 | Membresía de usuarios en clubes de lectura. |
| **Relaciones** | `[:LECTURA_ACTUAL]` | 2 | Libros seleccionados como lectura del mes en los clubes. |
| **Total Relaciones**| | **39** | Cumple el mínimo exigido (≥25 relaciones). |

## Reglas de Integridad y Validación
- **Idempotencia:** Cada entidad contiene una propiedad clave de negocio unívoca (`id`) gestionada mediante cláusulas `MERGE` para evitar duplicaciones accidentales.
- **Conectividad:** No existen nodos huérfanos; todos los lectores, libros y autores forman parte de la red de relaciones para garantizar resultados en recorridos de varios saltos.