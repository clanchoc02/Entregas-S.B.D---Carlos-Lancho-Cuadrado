// scripts/03-indices.js
// Creación de índices optimizados según preguntas de negocio

// 1. Índices para la colección: categorias
db.categorias.createIndex({ codigo: 1 }, { unique: true, name: "idx_categorias_codigo_unique" });
db.categorias.createIndex({ ruta_jerarquia: 1 }, { name: "idx_categorias_ruta" });

// 2. Índices para la colección: productos

// ÍNDICE COMPUESTO (Acelera P1: Catálogo por categoría, estado y ordenación por nota o precio)
// Permite evaluar igualdad en 'estado', prefijo en 'ruta_categoria' y ordenación en 'resumen_valoraciones.media'
db.productos.createIndex(
  { estado: 1, ruta_categoria: 1, "resumen_valoraciones.media": -1 },
  { name: "idx_productos_estado_ruta_media" }
);

// ÍNDICE MULTIKEY Y UNICIDAD (Acelera P2 y P3: Búsqueda por SKU de variante y control de stock)
db.productos.createIndex(
  { "variantes.codigo": 1 },
  { unique: true, name: "idx_productos_variantes_sku_unique" }
);

// ÍNDICE MULTIKEY COMPUESTO (Acelera P5: Alerta de stock crítico en variantes activas)
db.productos.createIndex(
  { estado: 1, "variantes.stock.cantidad_disponible": 1 },
  { name: "idx_productos_estado_stock_critico" }
);

// ÍNDICE DE TEXTO (Búsqueda general de productos por término en nombre y características)
db.productos.createIndex(
  { nombre: "text", "caracteristicas.valor": "text" },
  { default_language: "spanish", name: "idx_productos_texto_busqueda" }
);

// 3. Índices para la colección: resenas

// ÍNDICE COMPUESTO (Acelera P4: Últimas reseñas de un producto ordenadas por fecha reciente)
db.resenas.createIndex(
  { id_producto: 1, fecha_creacion: -1 },
  { name: "idx_resenas_producto_fecha" }
);

print("Índices creados satisfactoriamente.");