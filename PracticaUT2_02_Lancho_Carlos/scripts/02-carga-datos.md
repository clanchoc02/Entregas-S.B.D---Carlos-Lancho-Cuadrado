# 02 - Script de Carga de Datos Completo e Idempotente

Dataset conectado de BookCross con 23 nodos y 39 relaciones utilizando MERGE y SET para evitar duplicados en ejecuciones repetidas.

```cypher
// ==========================================
// 1. GÉNEROS LITERARIOS
// ==========================================
MERGE (g1:Genero {id: "GEN-01"}) SET g1.nombre = "Realismo Magico"
MERGE (g2:Genero {id: "GEN-02"}) SET g2.nombre = "Ciencia Ficcion"
MERGE (g3:Genero {id: "GEN-03"}) SET g3.nombre = "Distopia"
MERGE (g4:Genero {id: "GEN-04"}) SET g4.nombre = "Novela Historica";

// ==========================================
// 2. AUTORES
// ==========================================
MERGE (a1:Autor {id: "AUT-01"}) SET a1.nombre = "Gabriel Garcia Marquez", a1.nacionalidad = "CO", a1.anio_nacimiento = 1927
MERGE (a2:Autor {id: "AUT-02"}) SET a2.nombre = "George Orwell", a2.nacionalidad = "UK", a2.anio_nacimiento = 1903
MERGE (a3:Autor {id: "AUT-03"}) SET a3.nombre = "Isaac Asimov", a3.nacionalidad = "US", a3.anio_nacimiento = 1920
MERGE (a4:Autor {id: "AUT-04"}) SET a4.nombre = "Ursula K Le Guin", a4.nacionalidad = "US", a4.anio_nacimiento = 1929
MERGE (a5:Autor {id: "AUT-05"}) SET a5.nombre = "Isabel Allende", a5.nacionalidad = "CL", a5.anio_nacimiento = 1942;

// ==========================================
// 3. LIBROS
// ==========================================
MERGE (b1:Libro {id: "LIB-01"}) SET b1.titulo = "Cien anos de soledad", b1.paginas = 496, b1.anio_publicacion = 1967, b1.isbn = "978-8439732471"
MERGE (b2:Libro {id: "LIB-02"}) SET b2.titulo = "Cronica de una muerte anunciada", b2.paginas = 144, b2.anio_publicacion = 1981, b2.isbn = "978-8497592437"
MERGE (b3:Libro {id: "LIB-03"}) SET b3.titulo = "1984", b3.paginas = 328, b3.anio_publicacion = 1949, b3.isbn = "978-8466332965"
MERGE (b4:Libro {id: "LIB-04"}) SET b4.titulo = "Rebelion en la granja", b4.paginas = 144, b4.anio_publicacion = 1945, b4.isbn = "978-8499890944"
MERGE (b5:Libro {id: "LIB-05"}) SET b5.titulo = "Fundacion", b5.paginas = 256, b5.anio_publicacion = 1951, b5.isbn = "978-8497599245"
MERGE (b6:Libro {id: "LIB-06"}) SET b6.titulo = "Los desposeidos", b6.paginas = 416, b6.anio_publicacion = 1974, b6.isbn = "978-8445070284"
MERGE (b7:Libro {id: "LIB-07"}) SET b7.titulo = "La casa de los espiritus", b7.paginas = 450, b7.anio_publicacion = 1982, b7.isbn = "978-8401342653";

// ==========================================
// 4. ASIGNAR GÉNEROS A LIBROS
// ==========================================
MATCH (b:Libro {id: "LIB-01"}), (g:Genero {id: "GEN-01"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-02"}), (g:Genero {id: "GEN-01"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-03"}), (g:Genero {id: "GEN-03"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-04"}), (g:Genero {id: "GEN-03"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-05"}), (g:Genero {id: "GEN-02"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-06"}), (g:Genero {id: "GEN-02"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-07"}), (g:Genero {id: "GEN-01"}) MERGE (b)-[:PERTENECE_A]->(g);
MATCH (b:Libro {id: "LIB-07"}), (g:Genero {id: "GEN-04"}) MERGE (b)-[:PERTENECE_A]->(g);

// ==========================================
// 5. OBRAS ESCRITAS POR AUTORES
// ==========================================
MATCH (a:Autor {id: "AUT-01"}), (b:Libro {id: "LIB-01"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-01"}), (b:Libro {id: "LIB-02"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-02"}), (b:Libro {id: "LIB-03"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-02"}), (b:Libro {id: "LIB-04"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-03"}), (b:Libro {id: "LIB-05"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-04"}), (b:Libro {id: "LIB-06"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);
MATCH (a:Autor {id: "AUT-05"}), (b:Libro {id: "LIB-07"}) MERGE (a)-[:ESCRIBIO {rol: "principal"}]->(b);

// ==========================================
// 6. LECTORES
// ==========================================
MERGE (l1:Lector {id: "LEC-01"}) SET l1.nombre = "Mateo", l1.ciudad = "Caceres", l1.cuenta_activa = true
MERGE (l2:Lector {id: "LEC-02"}) SET l2.nombre = "Sofia", l2.ciudad = "Caceres", l2.cuenta_activa = true
MERGE (l3:Lector {id: "LEC-03"}) SET l3.nombre = "Carlos", l3.ciudad = "Badajoz", l3.cuenta_activa = true
MERGE (l4:Lector {id: "LEC-04"}) SET l4.nombre = "Lucia", l4.ciudad = "Merida", l4.cuenta_activa = true
MERGE (l5:Lector {id: "LEC-05"}) SET l5.nombre = "Elena", l5.ciudad = "Madrid", l5.cuenta_activa = false;

// ==========================================
// 7. RED DE SEGUIMIENTO SOCIAL
// ==========================================
MATCH (l1:Lector {id: "LEC-01"}), (l2:Lector {id: "LEC-02"}) MERGE (l1)-[:SIGUE_A {desde: "2024-01-15"}]->(l2);
MATCH (l1:Lector {id: "LEC-01"}), (l3:Lector {id: "LEC-03"}) MERGE (l1)-[:SIGUE_A {desde: "2024-03-20"}]->(l3);
MATCH (l2:Lector {id: "LEC-02"}), (l4:Lector {id: "LEC-04"}) MERGE (l2)-[:SIGUE_A {desde: "2024-04-10"}]->(l4);
MATCH (l3:Lector {id: "LEC-03"}), (l4:Lector {id: "LEC-04"}) MERGE (l3)-[:SIGUE_A {desde: "2024-05-01"}]->(l4);
MATCH (l4:Lector {id: "LEC-04"}), (l5:Lector {id: "LEC-05"}) MERGE (l4)-[:SIGUE_A {desde: "2024-06-12"}]->(l5);

// ==========================================
// 8. LECTURAS Y VALORACIONES
// ==========================================
MATCH (l:Lector {id: "LEC-01"}), (b:Libro {id: "LIB-01"}) MERGE (l)-[:LEYO {puntuacion: 5, favorito: true, fecha_fin: "2026-01-10"}]->(b);
MATCH (l:Lector {id: "LEC-01"}), (b:Libro {id: "LIB-04"}) MERGE (l)-[:LEYO {puntuacion: 4, favorito: false, fecha_fin: "2026-02-14"}]->(b);
MATCH (l:Lector {id: "LEC-02"}), (b:Libro {id: "LIB-01"}) MERGE (l)-[:LEYO {puntuacion: 5, favorito: true, fecha_fin: "2026-02-01"}]->(b);
MATCH (l:Lector {id: "LEC-02"}), (b:Libro {id: "LIB-02"}) MERGE (l)-[:LEYO {puntuacion: 5, favorito: true, fecha_fin: "2026-03-05"}]->(b);
MATCH (l:Lector {id: "LEC-02"}), (b:Libro {id: "LIB-07"}) MERGE (l)-[:LEYO {puntuacion: 4, favorito: true, fecha_fin: "2026-03-20"}]->(b);
MATCH (l:Lector {id: "LEC-03"}), (b:Libro {id: "LIB-03"}) MERGE (l)-[:LEYO {puntuacion: 5, favorito: true, fecha_fin: "2026-01-25"}]->(b);
MATCH (l:Lector {id: "LEC-03"}), (b:Libro {id: "LIB-05"}) MERGE (l)-[:LEYO {puntuacion: 4, favorito: false, fecha_fin: "2026-02-28"}]->(b);
MATCH (l:Lector {id: "LEC-04"}), (b:Libro {id: "LIB-06"}) MERGE (l)-[:LEYO {puntuacion: 5, favorito: true, fecha_fin: "2026-03-15"}]->(b);
MATCH (l:Lector {id: "LEC-04"}), (b:Libro {id: "LIB-02"}) MERGE (l)-[:LEYO {puntuacion: 4, favorito: false, fecha_fin: "2026-04-02"}]->(b);

// ==========================================
// 9. EJEMPLARES FÍSICOS PARA PRÉSTAMO
// ==========================================
MATCH (l:Lector {id: "LEC-02"}), (b:Libro {id: "LIB-02"}) MERGE (l)-[:PRESTA {estado: "disponible", ciudad: "Caceres", fecha_alta: "2026-09-01"}]->(b);
MATCH (l:Lector {id: "LEC-03"}), (b:Libro {id: "LIB-05"}) MERGE (l)-[:PRESTA {estado: "disponible", ciudad: "Badajoz", fecha_alta: "2026-09-10"}]->(b);
MATCH (l:Lector {id: "LEC-04"}), (b:Libro {id: "LIB-06"}) MERGE (l)-[:PRESTA {estado: "disponible", ciudad: "Merida", fecha_alta: "2026-09-15"}]->(b);
MATCH (l:Lector {id: "LEC-04"}), (b:Libro {id: "LIB-07"}) MERGE (l)-[:PRESTA {estado: "disponible", ciudad: "Merida", fecha_alta: "2026-09-20"}]->(b);

// ==========================================
// 10. CLUBES DE LECTURA Y LECTURAS MENSUALES
// ==========================================
MATCH (l:Lector {id: "LEC-01"}), (c:Club {id: "CLB-01"}) MERGE (l)-[:MIEMBRO_DE {rol: "socio", fecha_ingreso: "2025-01-10"}]->(c);
MATCH (l:Lector {id: "LEC-02"}), (c:Club {id: "CLB-01"}) MERGE (l)-[:MIEMBRO_DE {rol: "coordinador", fecha_ingreso: "2024-11-01"}]->(c);
MATCH (l:Lector {id: "LEC-03"}), (c:Club {id: "CLB-02"}) MERGE (l)-[:MIEMBRO_DE {rol: "socio", fecha_ingreso: "2025-02-15"}]->(c);
MATCH (l:Lector {id: "LEC-04"}), (c:Club {id: "CLB-02"}) MERGE (l)-[:MIEMBRO_DE {rol: "socio", fecha_ingreso: "2025-03-01"}]->(c);

MATCH (c:Club {id: "CLB-01"}), (b:Libro {id: "LIB-01"}) MERGE (c)-[:LECTURA_ACTUAL {mes: "Octubre", anio: 2026}]->(b);
MATCH (c:Club {id: "CLB-02"}), (b:Libro {id: "LIB-05"}) MERGE (c)-[:LECTURA_ACTUAL {mes: "Octubre", anio: 2026}]->(b);
```