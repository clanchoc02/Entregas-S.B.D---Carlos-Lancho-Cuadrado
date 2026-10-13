// scripts/01-colecciones-validacion.js
// Creación de colecciones con reglas de validación $jsonSchema

// 1. Limpieza inicial
db.categorias.drop();
db.productos.drop();
db.resenas.drop();

// 2. Colección: categorias
db.createCollection("categorias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["codigo", "nombre", "ruta_jerarquia"],
      properties: {
        _id: { bsonType: "objectId" },
        codigo: {
          bsonType: "string",
          pattern: "^CAT-[A-Z0-9]+$",
          description: "Código identificativo con formato 'CAT-XXX' (obligatorio)"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre de la categoría (obligatorio)"
        },
        slug: {
          bsonType: "string",
          description: "Identificador amigable para URL"
        },
        id_padre: {
          bsonType: ["objectId", "null"],
          description: "Referencia a la categoría superior si existe"
        },
        ruta_jerarquia: {
          bsonType: "string",
          pattern: "^,.*,$",
          description: "Ruta jerárquica delimitada por comas, ej: ',electronica,telefonia,' (obligatorio)"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// 3. Colección: productos
db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["codigo", "nombre", "id_categoria", "estado", "variantes"],
      properties: {
        _id: { bsonType: "objectId" },
        codigo: {
          bsonType: "string",
          pattern: "^PROD-[A-Z0-9-]+$",
          description: "Código único de producto (obligatorio)"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del producto (obligatorio)"
        },
        id_categoria: {
          bsonType: "objectId",
          description: "Referencia a la categoría (obligatorio)"
        },
        ruta_categoria: {
          bsonType: "string",
          description: "Ruta desnormalizada de la categoría"
        },
        estado: {
          enum: ["activo", "borrador", "archivado"],
          description: "Estado del ciclo de vida del producto (obligatorio)"
        },
        caracteristicas: {
          bsonType: "array",
          description: "Attribute Pattern para especificaciones variables",
          items: {
            bsonType: "object",
            required: ["clave", "valor"],
            properties: {
              clave: { bsonType: "string" },
              valor: {}
            }
          }
        },
        variantes: {
          bsonType: "array",
          minItems: 1,
          description: "Lista de variantes comerciales (al menos 1 obligatoria)",
          items: {
            bsonType: "object",
            required: ["codigo", "precio", "stock"],
            properties: {
              id_variante: { bsonType: "string" },
              codigo: { bsonType: "string", description: "SKU comercial único de la variante" },
              precio: {
                bsonType: "number",
                minimum: 0.01,
                description: "Precio de venta superior a 0 (obligatorio)"
              },
              detalles: { bsonType: "object" },
              stock: {
                bsonType: "object",
                required: ["cantidad_disponible"],
                properties: {
                  cantidad_disponible: {
                    bsonType: "int",
                    minimum: 0,
                    description: "Existencias disponibles, no negativo (obligatorio)"
                  },
                  cantidad_reservada: { bsonType: "int", minimum: 0 },
                  almacen: { bsonType: "string" }
                }
              }
            }
          }
        },
        resumen_valoraciones: {
          bsonType: "object",
          properties: {
            media: { bsonType: "number", minimum: 0, maximum: 5 },
            total_opiniones: { bsonType: "int", minimum: 0 }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// 4. Colección: resenas
db.createCollection("resenas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_producto", "id_usuario", "puntuacion", "fecha_creacion"],
      properties: {
        _id: { bsonType: "objectId" },
        id_producto: {
          bsonType: "objectId",
          description: "Referencia obligatoria al producto valorado"
        },
        id_usuario: {
          bsonType: "objectId",
          description: "Identificador del usuario autor"
        },
        puntuacion: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Puntuación entera entre 1 y 5 (obligatorio)"
        },
        titulo: { bsonType: "string" },
        comentario: { bsonType: "string" },
        fecha_creacion: {
          bsonType: "date",
          description: "Fecha en formato ISODate (obligatorio)"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

print("Colecciones creadas con validadores $jsonSchema.");