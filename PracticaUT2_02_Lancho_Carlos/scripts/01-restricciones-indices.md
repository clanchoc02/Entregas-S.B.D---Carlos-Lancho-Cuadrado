# 01 - Creación de Restricciones de Unicidad e Índices Secundarios

Ejecutar este bloque de sentencias en Neo4j Browser o mediante cypher-shell para asegurar la integridad referencial y acelerar las búsquedas por índice antes de la carga de datos.

```cypher
// ==========================================
// 1. RESTRICCIONES DE UNICIDAD
// ==========================================

// Unicidad de Libros por ID
CREATE CONSTRAINT c_libro_id IF NOT EXISTS
FOR (b:Libro) REQUIRE b.id IS UNIQUE;

// Unicidad de Autores por ID
CREATE CONSTRAINT c_autor_id IF NOT EXISTS
FOR (a:Autor) REQUIRE a.id IS UNIQUE;

// Unicidad de Lectores por ID
CREATE CONSTRAINT c_lector_id IF NOT EXISTS
FOR (l:Lector) REQUIRE l.id IS UNIQUE;

// Unicidad de Géneros por ID
CREATE CONSTRAINT c_genero_id IF NOT EXISTS
FOR (g:Genero) REQUIRE g.id IS UNIQUE;

// Unicidad de Clubes por ID
CREATE CONSTRAINT c_club_id IF NOT EXISTS
FOR (c:Club) REQUIRE c.id IS UNIQUE;

// ==========================================
// 2. ÍNDICES SECUNDARIOS
// ==========================================

// Búsqueda directa por título de libro en el buscador
CREATE INDEX idx_libro_titulo IF NOT EXISTS
FOR (b:Libro) ON (b.titulo);

// Búsqueda de autores por nombre
CREATE INDEX idx_autor_nombre IF NOT EXISTS
FOR (a:Autor) ON (a.nombre);

// Filtrado de libros por año de publicación
CREATE INDEX idx_libro_publicacion IF NOT EXISTS
FOR (b:Libro) ON (b.anio_publicacion);
```