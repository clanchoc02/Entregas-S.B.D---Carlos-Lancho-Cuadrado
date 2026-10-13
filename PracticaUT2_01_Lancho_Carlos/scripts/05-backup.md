# Procedimiento Operativo: Respaldo, Restauración y Seguridad (RBAC)

Este documento detalla los comandos de terminal y sentencias administrativas para la gestión de copias de seguridad y control de accesos en la base de datos `tienda_online`.

---

## 1. Copia de Seguridad con `mongodump`

Para realizar un volcado lógico consistente, comprimido y sin interrumpir las operaciones del catálogo, se utiliza `mongodump` desde la terminal del sistema operativo (fuera de `mongosh`):

```bash
# Exportar la base de datos completa comprimida en formato gzip
mongodump --uri="mongodb+srv://<cluster-url>/tienda_online" \
  --username "<usuario_admin>" \
  --gzip \
  --out=./backups/backup_$(date +%Y%m%d_%H%M%S)
```

* **Parámetros utilizados:**
  * `--uri`: Cadena de conexión al clúster de Atlas.
  * `--gzip`: Comprime las colecciones BSON al vuelo, reduciendo el consumo de disco y red en más de un 70%.
  * `--out`: Directorio de destino con marca temporal para trazabilidad.

---

## 2. Restauración con `mongorestore`

Para restablecer la base de datos ante una contingencia o recrear el entorno de desarrollo:

```bash
# Restauración con reemplazo limpio (--drop)
mongorestore --uri="mongodb+srv://<cluster-url>/tienda_online" \
  --username "<usuario_admin>" \
  --gzip \
  --drop \
  --dir=./backups/backup_20261005_120000/tienda_online
```

* **Parámetros utilizados:**
  * `--drop`: Elimina las colecciones existentes antes de restaurar, asegurando que no queden documentos residuales ni inconsistencias.
  * `--gzip`: Descomprime automáticamente los ficheros `.bson.gz`.

---

## 3. Configuración de Usuarios y Roles Mínimos (RBAC)

Ejecutar dentro de la consola `mongosh` con privilegios de administrador de usuarios (`userAdminAnyDatabase`):

```javascript
use admin;

// 1. Usuario para el backend de la tienda (Principio de mínimo privilegio)
db.createUser({
  user: "app_tienda_backend",
  pwd: passwordPrompt(), // Solicita la contraseña de forma segura por consola
  roles: [
    { role: "readWrite", db: "tienda_online" }
  ]
});

// 2. Usuario para administración y tareas de mantenimiento/backup
db.createUser({
  user: "admin_mantenimiento",
  pwd: passwordPrompt(),
  roles: [
    { role: "dbAdmin", db: "tienda_online" },
    { role: "backup", db: "admin" },
    { role: "restore", db: "admin" }
  ]
});
```