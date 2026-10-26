# Práctica 2: Modelado e Implementación de Base de Datos en Grafos con Neo4j
**Escenario:** Plataforma Comunitaria de Lectura e Intercambio de Libros (**BookCross**)  
**Materia:** Sistemas de Big Data / Bases de Datos NoSQL  

---

## 1. Descripción del Proyecto

BookCross es una plataforma comunitaria (inspirada en Goodreads) que modela las interacciones entre lectores, catálogo bibliográfico, autores, géneros y clubes de lectura. El sistema está implementado de forma nativa en **Neo4j** para resolver con baja latencia algoritmos de recomendación social por afinidad y cadenas de préstamo físico de libros mediante el algoritmo del camino más corto (`shortestPath`).

---

## 2. Estructura del Repositorio

El proyecto sigue una organización modular dividida en documentación técnica, scripts reproducibles de Cypher, especificación del dataset y evidencias visuales:

```text
practica02/
├── README.md                           # Instrucciones globales de ejecución y entrega
├── docs/
│   ├── modelo.md                       # Memoria técnica completa (Actividades 1 a 5)
│   └── evidencias/                     # Capturas de pantalla de Neo4j Browser
│       ├── 01-diagrama-BookCross.png
│       ├── 02-creacion-ejemplo-nodos.png
│       ├── 03-grafo-ejemplo-visual.png
│       ├── 04-restricciones.png
│       ├── 05-indices.png
│       ├── 06-carga-datos-merge_2.png
│       ├── 07-grafo-completo.png
│       ├── 08-profile-nodeindexseek.png
│       ├── 09-consulta-transaccional_2.png
│       ├── 10-consulta-1-salto-autor_2.png
│       ├── 11-consulta-multi-salto-club.png
│       ├── 12-recomendacion-social-afinidad.png
│       └── 13-shortestpath-cadena-prestamo.png
├── datos/
│   └── README.md                       # Ficha técnica y métricas cuantitativas del dataset
└── scripts/
    ├── 01-restricciones-indices.md     # Cypher: restricciones de unicidad e índices
    ├── 02-carga-datos.md               # Cypher: inserción idempotente con MERGE y MATCH
    ├── 03-consultas-recorridos.md      # Cypher: 5 consultas analíticas y shortestPath
    └── 04-backup.md                    # Bash/Cypher: comandos de dump/load y roles RBAC
```

---

## 3. Requisitos del Entorno

* **Motor:** Neo4j Community / Enterprise / Desktop (versión 5.x o superior) o Neo4j AuraDB.
* **Cliente:** Neo4j Browser o consola CLI `cypher-shell`.
* **Lenguaje:** Cypher 25.

---

## 4. Guía de Ejecución y Reproducción Paso a Paso

Para desplegar y validar el proyecto desde cero en Neo4j Browser:

### Paso 1: Configurar Restricciones e Índices
Abre y ejecuta el contenido de `scripts/01-restricciones-indices.md`:
* Aplica las 5 restricciones de unicidad (`IS UNIQUE`) para `Libro`, `Autor`, `Lector`, `Genero` y `Club`.
* Crea los índices secundarios sobre `Libro(titulo)`, `Autor(nombre)` y `Libro(anio_publicacion)`.

### Paso 2: Cargar el Dataset Conectado
Abre y ejecuta el contenido de `scripts/02-carga-datos.md`:
* Carga de forma idempotente mediante cláusulas `MERGE` y referencias explícitas con `MATCH`.
* Genera **23 nodos** y **39 relaciones** sin duplicados.

### Paso 3: Validar el Grafo Cargado
Comprueba la correcta conexión de todos los elementos ejecutando:
```cypher
MATCH (n)-[r]->(m) RETURN n, r, m;
```

### Paso 4: Ejecución de Consultas y Recorridos
Abre `scripts/03-consultas-recorridos.md` y ejecuta las consultas para validar las preguntas de negocio:
1. **Transaccional:** Registro o actualización de lectura con `MERGE` y `SET`.
2. **1 Salto:** Catálogo completo de obras y géneros por autor.
3. **Multi-Salto:** Miembros de un club leyendo la obra del mes con valoración ≥ 4.
4. **Recomendación:** Descubrimiento social de libros avalados por contactos seguidos.
5. **shortestPath:** Cálculo de la cadena de confianza mínima para préstamo físico.

---

## 5. Resumen Cuantitativo del Grafo

| Entidad / Relación | Etiqueta | Total Elementos |
| :--- | :--- | :--- |
| Lectores | `:Lector` | 5 |
| Libros | `:Libro` | 7 |
| Autores | `:Autor` | 5 |
| Géneros | `:Genero` | 4 |
| Clubes | `:Club` | 2 |
| **Total Nodos** | | **23** *(mínimo exigido: 15)* |
| **Total Relaciones** | `[:ESCRIBIO]`, `[:PERTENECE_A]`, `[:SIGUE_A]`, `[:LEYO]`, `[:PRESTA]`, `[:MIEMBRO_DE]`, `[:LECTURA_ACTUAL]` | **39** *(mínimo exigido: 25)* |