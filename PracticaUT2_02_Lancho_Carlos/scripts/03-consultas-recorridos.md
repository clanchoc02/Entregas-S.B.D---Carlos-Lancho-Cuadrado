# 03 - Consultas Cypher y Recorridos Complejos en BookCross

Este archivo contiene las sentencias Cypher reproducibles para validar las preguntas de negocio y los casos de uso analíticos del grafo.

```cypher
// =============================================================================
// 1. OPERACIÓN TRANSACCIONAL IDEMPOTENTE: REGISTRO DE LECTURA Y PUNTUACIÓN
// =============================================================================
MATCH (l:Lector {id: "LEC-01"})
MATCH (b:Libro {id: "LIB-02"})
MERGE (l)-[r:LEYO]->(b)
ON CREATE SET r.puntuacion = 5,
              r.favorito = true,
              r.fecha_fin = "2026-10-25"
ON MATCH SET r.puntuacion = 5,
             r.favorito = true,
             r.ultima_actualizacion = datetime()
RETURN l.nombre AS lector,
       b.titulo AS libro,
       r.puntuacion AS estrellas,
       r.favorito AS es_favorito;

// =============================================================================
// 2. CONSULTA DE 1 SALTO: CATÁLOGO DE OBRAS DE UN AUTOR Y SUS GÉNEROS
// =============================================================================
MATCH (a:Autor {nombre: "Gabriel Garcia Marquez"})-[:ESCRIBIO]->(b:Libro)
OPTIONAL MATCH (b)-[:PERTENECE_A]->(g:Genero)
RETURN a.nombre AS autor,
       b.titulo AS libro,
       b.anio_publicacion AS anio,
       b.paginas AS paginas,
       collect(DISTINCT g.nombre) AS generos
ORDER BY anio ASC;

// =============================================================================
// 3. CONSULTA MULTI-SALTO: MIEMBROS DE UN CLUB LEYENDO LA LECTURA DEL MES
// =============================================================================
MATCH (c:Club {nombre: "Club de Realismo Magico"})-[:LECTURA_ACTUAL]->(b:Libro)
MATCH (l:Lector)-[:MIEMBRO_DE]->(c)
MATCH (l)-[r:LEYO]->(b)
WHERE r.puntuacion >= 4
RETURN c.nombre AS club,
       b.titulo AS lectura_del_mes,
       l.nombre AS miembro,
       r.puntuacion AS calificacion,
       r.favorito AS es_favorito;

// =============================================================================
// 4. RECOMENDACIÓN SOCIAL POR AFINIDAD (AMIGOS DE MIS AMIGOS)
// =============================================================================
MATCH (yo:Lector {id: "LEC-01"})-[:SIGUE_A]->(amigo:Lector)-[r:LEYO]->(b:Libro)
WHERE r.puntuacion >= 4
  AND NOT (yo)-[:LEYO]->(b)
MATCH (a:Autor)-[:ESCRIBIO]->(b)
OPTIONAL MATCH (b)-[:PERTENECE_A]->(g:Genero)
RETURN b.titulo AS libro_recomendado,
       a.nombre AS autor,
       collect(DISTINCT g.nombre) AS generos,
       collect(DISTINCT amigo.nombre) AS recomendado_por,
       count(amigo) AS amigos_que_lo_avalan,
       round(avg(r.puntuacion), 1) AS puntuacion_media_circulo
ORDER BY amigos_que_lo_avalan DESC, puntuacion_media_circulo DESC;

// =============================================================================
// 5. CAMINO MÁS CORTO: CADENA DE PRÉSTAMO DE MÍNIMA DISTANCIA
// =============================================================================
MATCH (solicitante:Lector {id: "LEC-01"}), (b:Libro {id: "LIB-06"})
MATCH (propietario:Lector)-[p:PRESTA]->(b)
WHERE p.estado = "disponible"
MATCH camino = shortestPath((solicitante)-[:SIGUE_A*..6]->(propietario))
RETURN [n IN nodes(camino) | n.nombre] AS cadena_de_confianza,
       length(camino) AS intermediarios,
       propietario.nombre AS poseedor_libro,
       propietario.ciudad AS ciudad_recogida,
       b.titulo AS libro_prestado;
```