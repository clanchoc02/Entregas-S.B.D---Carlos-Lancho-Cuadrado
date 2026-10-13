// scripts/04-consultas.js
// Actividad 4: Consultas CRUD, Paginación, $lookup y Agregación Compleja

// -----------------------------------------------------------------------------
// 1. Operaciones CRUD: Inserción, Actualización Parcial y Desactivación Lógica
// -----------------------------------------------------------------------------

// 1.1 Inserción de un nuevo producto con variantes y stock
db.productos.insertOne({
  codigo: "PROD-AURIC-NOISE",
  nombre: "Auriculares Inalámbricos Pro ANC",
  id_categoria: ObjectId("66f81a0e10a2b3c4d5e6f711"),
  ruta_categoria: ",electronica,audio,",
  estado: "activo",
  caracteristicas: [
    { clave: "conectividad", valor: "Bluetooth 5.3" },
    { clave: "cancelacion_ruido", valor: "Activa (ANC)" }
  ],
  variantes: [
    {
      id_variante: "VAR-AUR-01",
      codigo: "AUR-PRO-NEG",
      precio: 149.99,
      detalles: { color: "Negro Mate" },
      stock: { cantidad_disponible: 30, cantidad_reservada: 0, almacen: "Central" }
    }
  ],
  resumen_valoraciones: {
    media: 0.0,
    total_opiniones: 0
  }
});

// 1.2 Actualización parcial con $set y $inc (llegada de stock y ajuste de precio)
db.productos.updateOne(
  { codigo: "PROD-AURIC-NOISE", "variantes.codigo": "AUR-PRO-NEG" },
  {
    $set: { "variantes.$.precio": 139.99 },
    $inc: { "variantes.$.stock.cantidad_disponible": 10 }
  }
);

// 1.3 Desactivación lógica (Soft delete: marcar producto como archivado)
db.productos.updateOne(
  { codigo: "PROD-AURIC-NOISE" },
  { $set: { estado: "archivado" } }
);

// -----------------------------------------------------------------------------
// 2. Filtros Combinados, Ordenación y Paginación Estable
// -----------------------------------------------------------------------------
// Paginación de catálogo: filtra productos activos de electrónica con variantes <= 700€
// Ordena por puntuación media descendente y desempata por _id para estabilidad
db.productos.find(
  {
    estado: "activo",
    ruta_categoria: /^,electronica,/,
    "variantes.precio": { $lte: 700.0 }
  },
  {
    nombre: 1,
    codigo: 1,
    ruta_categoria: 1,
    "resumen_valoraciones.media": 1,
    "variantes.precio": 1
  }
)
.sort({ "resumen_valoraciones.media": -1, _id: 1 })
.skip(0)
.limit(2);

// -----------------------------------------------------------------------------
// 3. Consulta con Referencia Mediante $lookup
// -----------------------------------------------------------------------------
// Carga la ficha de un producto uniendo sus reseñas desde la colección independiente
db.productos.aggregate([
  {
    $match: { codigo: "PROD-SMART-ALPHA" }
  },
  {
    $lookup: {
      from: "resenas",
      localField: "_id",
      foreignField: "id_producto",
      as: "opiniones_clientes"
    }
  },
  {
    $project: {
      codigo: 1,
      nombre: 1,
      estado: 1,
      total_opiniones_registradas: { $size: "$opiniones_clientes" },
      opiniones_clientes: {
        puntuacion: 1,
        titulo: 1,
        comentario: 1,
        fecha_creacion: 1
      }
    }
  }
]);

// -----------------------------------------------------------------------------
// 4. Agregación Compleja de 4+ Etapas con $facet ($match, $unwind, $facet, $group, $sort)
// -----------------------------------------------------------------------------
// Cuadro de mando de almacén:
// - Rama 1: Valor económico total del inventario acumulado por categoría
// - Rama 2: Alerta de reposición de variantes con stock disponible <= 5
db.productos.aggregate([
  // Etapa 1: Filtrar solo productos en catálogo activo
  {
    $match: { estado: "activo" }
  },

  // Etapa 2: Desanidar el array de variantes para operar a nivel de SKU individual
  {
    $unwind: "$variantes"
  },

  // Etapa 3 y 4: Análisis multifacético en paralelo
  {
    $facet: {
      // Sub-pipeline 1: Valoración de stock por categoría
      valor_inventario_categoria: [
        {
          $group: {
            _id: "$ruta_categoria",
            unidades_totales: { $sum: "$variantes.stock.cantidad_disponible" },
            valor_economico: {
              $sum: {
                $multiply: [
                  "$variantes.stock.cantidad_disponible",
                  "$variantes.precio"
                ]
              }
            }
          }
        },
        {
          $sort: { valor_economico: -1 }
        }
      ],

      // Sub-pipeline 2: Alerta logística de stock crítico (<= 5 unidades)
      alerta_reposicion_urgente: [
        {
          $match: { "variantes.stock.cantidad_disponible": { $lte: 5 } }
        },
        {
          $project: {
            _id: 0,
            producto: "$nombre",
            codigo_variante: "$variantes.codigo",
            almacen: "$variantes.stock.almacen",
            unidades_restantes: "$variantes.stock.cantidad_disponible"
          }
        }
      ]
    }
  }
]);