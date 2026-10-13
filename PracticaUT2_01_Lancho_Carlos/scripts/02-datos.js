// scripts/02-datos.js
// Carga de datos de prueba para categorias, productos y resenas

// 1. Limpieza previa
db.categorias.drop();
db.productos.drop();
db.resenas.drop();

// 2. Insertar Categorías
db.categorias.insertMany([
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f710"),
    codigo: "CAT-ELEC",
    nombre: "Electrónica",
    ruta_jerarquia: ",electronica,"
  },
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f711"),
    codigo: "CAT-TEL",
    nombre: "Telefonía y Smartphones",
    id_padre: ObjectId("66f81a0e10a2b3c4d5e6f710"),
    ruta_jerarquia: ",electronica,telefonia,"
  },
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f720"),
    codigo: "CAT-MODA",
    nombre: "Moda y Ropa",
    ruta_jerarquia: ",moda,"
  }
]);

// 3. Insertar Productos (con variantes y stock incrustados)
db.productos.insertMany([
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f701"),
    codigo: "PROD-SMART-ALPHA",
    nombre: "Teléfono Móvil Alpha Pro",
    id_categoria: ObjectId("66f81a0e10a2b3c4d5e6f711"),
    ruta_categoria: ",electronica,telefonia,",
    estado: "activo",
    caracteristicas: [
      { clave: "conectividad", valor: "5G" },
      { clave: "pantalla_pulgadas", valor: 6.7 }
    ],
    variantes: [
      {
        id_variante: "VAR-01",
        codigo: "ALPHA-128-NEG",
        precio: 699.99,
        detalles: { color: "Negro Grafito", almacenamiento: "128GB" },
        stock: { cantidad_disponible: 45, cantidad_reservada: 2, almacen: "Central" }
      },
      {
        id_variante: "VAR-02",
        codigo: "ALPHA-256-PLA",
        precio: 799.99,
        detalles: { color: "Plata", almacenamiento: "256GB" },
        stock: { cantidad_disponible: 12, cantidad_reservada: 0, almacen: "Central" }
      }
    ],
    resumen_valoraciones: {
      media: 4.67,
      total_opiniones: 3
    }
  },
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f702"),
    codigo: "PROD-ZAP-TRAIL",
    nombre: "Zapatillas Trail Running",
    id_categoria: ObjectId("66f81a0e10a2b3c4d5e6f720"),
    ruta_categoria: ",moda,",
    estado: "activo",
    caracteristicas: [
      { clave: "tipo_terreno", valor: "montaña" }
    ],
    variantes: [
      {
        id_variante: "VAR-10",
        codigo: "ZAP-TRAIL-42-AZL",
        precio: 89.95,
        detalles: { talla: 42, color: "Azul Marino" },
        stock: { cantidad_disponible: 4, cantidad_reservada: 0, almacen: "Secundario" }
      }
    ],
    resumen_valoraciones: { media: 4.0, total_opiniones: 1 }
  }
]);

// 4. Insertar Reseñas
db.resenas.insertMany([
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f801"),
    id_producto: ObjectId("66f81a0e10a2b3c4d5e6f701"),
    id_usuario: ObjectId("66f81a0e10a2b3c4d5e6f901"),
    puntuacion: 5,
    titulo: "Increíble batería y pantalla",
    comentario: "Dura más de un día completo de uso continuo.",
    fecha_creacion: new Date("2026-08-15T10:30:00Z")
  },
  {
    _id: ObjectId("66f81a0e10a2b3c4d5e6f802"),
    id_producto: ObjectId("66f81a0e10a2b3c4d5e6f701"),
    id_usuario: ObjectId("66f81a0e10a2b3c4d5e6f902"),
    puntuacion: 4,
    titulo: "Buen teléfono",
    comentario: "El rendimiento es perfecto, aunque algo grande.",
    fecha_creacion: new Date("2026-08-20T14:15:00Z")
  }
]);

print("Datos insertados correctamente.");