# Práctica 01: Modelado, Validación, Optimización y Seguridad en MongoDB

**Módulo:** Sistemas Big Data
**Escenario Seleccionado:** Catálogo de Comercio Electrónico Heterogéneo con Variantes, Stock y Reseñas  
**Versión de MongoDB:** 7.0 / 8.0 (MongoDB Atlas / mongosh 2.x)

---

## 1. Estructura del Repositorio

```text
├── README.md                  # Guía general de ejecución y reproducción
├── scripts/
│   ├── 01-colecciones-validacion.js  # Creación de colecciones con $jsonSchema
│   ├── 02-datos.js                   # Carga del dataset de prueba coherente
│   ├── 03-indices.js                 # Índices optimizados (Compuesto, Multikey, Texto)
│   ├── 04-consultas.js               # Operaciones CRUD, paginación, $lookup y $facet
│   └── 05-backup.md                  # Procedimiento de respaldo, restauración y RBAC
├── docs/
│   ├── modelo.md                     # Memoria técnica completa de las actividades 1 a 6
│   └── evidencias/                   # 11 capturas de pantalla de validación, planes y salidas
└── datos/
    └── README.md                     # Descripción del juego de datos y entidades
```

---

## 2. Orden de Ejecución y Reproducibilidad desde Cero

Para comprobar que los scripts funcionan de forma autónoma y limpia partiendo de una base de datos vacía, sigue esta secuencia:

### Paso 0: Conexión y Limpieza Inicial
Conéctate a la consola interactiva `mongosh` y sitúate en la base de datos del proyecto:

```javascript
use tienda_online;

// Borrado preventivo para garantizar que se parte de una base de datos vacía
db.dropDatabase();
```

### Paso 1: Creación de Colecciones y Reglas de Validación
Ejecuta las reglas de esquema `$jsonSchema` estrictas:
```javascript
load("scripts/01-colecciones-validacion.js");
```
*Crea las colecciones `categorias`, `productos` y `resenas` con validación activa.*

### Paso 2: Carga del Dataset Coherente
Inserta los documentos de prueba iniciales:
```javascript
load("scripts/02-datos.js");
```
*Registra la jerarquía de categorías, productos tecnológicos/moda con variantes y stock, y opiniones de clientes.*

### Paso 3: Creación de Índices
Genera los índices compuestos, multikey y de texto:
```javascript
load("scripts/03-indices.js");
```

### Paso 4: Pruebas de Consultas y Agregación
Ejecuta las operaciones CRUD, filtros estables y pipelines de analítica:
```javascript
load("scripts/04-consultas.js");
```

### Paso 5: Copia de Seguridad y Restauración
Sigue las instrucciones detalladas en `scripts/05-backup.md` ejecutando las utilidades `mongodump` y `mongorestore` desde la terminal del sistema operativo.

---

## 3. Comprobación de Evidencias

Todas las evidencias requeridas por la rúbrica se encuentran archivadas en la carpeta `docs/evidencias/` y enlazadas en `docs/modelo.md`:
* **Capturas 1 a 3:** Colecciones físicas y documentos de ejemplo con datos incrustados y referenciados.
* **Captura 4:** Rechazo atómico de inserción por `$jsonSchema` (`Document failed validation`).
* **Capturas 5 y 6:** Planes de ejecución `explain("executionStats")` demostrando la transición de `COLLSCAN` + `SORT` a `IXSCAN` + `FETCH`.
* **Capturas 7 a 10:** Salidas de operaciones CRUD, paginación determinista, unión `$lookup` y agregación multifacética con `$facet`.
* **Captura 11:** Salida en consola de respaldo y restauración con reemplazo (`--drop`).
