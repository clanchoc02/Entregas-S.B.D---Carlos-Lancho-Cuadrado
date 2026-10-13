# Descripción del Conjunto de Datos (Dataset)

Este directorio documenta el juego de datos de prueba inyectado en la base de datos `tienda_online` a través del script ejecutable `scripts/02-datos.js`.

---

## 1. Composición y Cardinalidad del Dataset

El conjunto de datos ha sido diseñado para simular un catálogo comercial heterogéneo real:

* **Colección `categorias` (Taxonomía Jerárquica):**
  * Contiene categorías raíz y subdepartamentos mediante el patrón de rutas materializadas (*Materialized Path*), tales como `",electronica,"`, `",electronica,telefonia,"`, `",electronica,audio,"` y `",moda,calzado,"`.
* **Colección `productos` (Catálogo Principal):**
  * Registra artículos con especificaciones variables en pares `{ clave, valor }`.
  * Cada producto incrusta entre 1 y 4 variantes comerciales (combinaciones de almacenamiento, color o talla).
  * Cada variante gestiona su propio objeto de stock (`cantidad_disponible`, `cantidad_reservada`, `almacen`).
  * Incluye casos límite preparados para auditoría: productos con stock abundante, variantes con **stock crítico ($\le 5$ unidades)** para activar alarmas logísticas, y resúmenes de valoración precalculados.
* **Colección `resenas` (Opiniones de Clientes):**
  * Registra valoraciones independientes vinculadas por `id_producto`, cubriendo un abanico de puntuaciones de 1 a 5 estrellas con comentarios y fechas UTC.

---

## 2. Inserción Masiva Alternativa

Dado que los datos están parametrizados en JavaScript puro en `scripts/02-datos.js`, no se requiere la presencia de ficheros CSV o JSON externos, garantizando compatibilidad directa con `mongosh` sin dependencias de red o rutas locales.