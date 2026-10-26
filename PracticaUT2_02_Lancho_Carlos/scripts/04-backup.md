# 04 - Procedimiento de Copias de Seguridad y Administración (BookCross)

Comandos de terminal para copias de seguridad y restauración física:

```bash
# 1. Copia física completa de la base de datos BookCross
neo4j-admin database dump neo4j --to-path=/var/backups/neo4j/bookcross_$(date +%F).dump

# 2. Restauración de la base de datos
neo4j-admin database load neo4j --from-path=/var/backups/neo4j/bookcross_2026-10-25.dump --overwrite-destination=true
```

*En Neo4j AuraDB las copias de seguridad se realizan de forma automática cada 24 horas y permiten restaurar con un solo clic desde la consola web.*

Sentencias Cypher de control de acceso y usuarios (RBAC):

```cypher
// Usuario para la API de la aplicación móvil (rol exclusivo de lectura)
CREATE USER app_bookcross SET PASSWORD 'AppBookCrossPass_2026!' CHANGE NOT REQUIRED;
GRANT ROLE reader TO app_bookcross;

// Usuario para el equipo editorial (gestión de libros y autores)
CREATE USER editor_literario SET PASSWORD 'EditorLiterarioPass_2026!' CHANGE NOT REQUIRED;
GRANT ROLE editor TO editor_literario;
```