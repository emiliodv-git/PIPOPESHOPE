/**
 * ============================================================================
 *  CATÁLOGO DE PRODUCTOS — PIPOPE SHOPE
 * ============================================================================
 *  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR PARA CAMBIAR:
 *    - Precios
 *    - Colores / variantes
 *    - Stock
 *    - Rutas de fotografías
 *    - Descripciones y características
 *    - Promociones / descuentos
 *
 *  No es necesario tocar HTML, CSS ni el resto del JavaScript para
 *  actualizar el catálogo: todo el sitio se dibuja a partir de este archivo.
 *
 * ----------------------------------------------------------------------------
 *  REGLA DE VERACIDAD (léela antes de editar)
 * ----------------------------------------------------------------------------
 *  Los campos marcados como `verified: true` provienen de información
 *  públicamente disponible en donmayoreo.com y/o son cálculos matemáticos
 *  simples (conversión oz -> ml). NO representan garantías del fabricante.
 *
 *  Los campos marcados como `verified: false` (o con status "pending")
 *  todavía NO tienen una fuente confirmada. Se muestran en el sitio como
 *  "Por confirmar" para no inventar información. Reemplázalos por datos
 *  reales en cuanto tu proveedor o tus propias pruebas del producto los
 *  confirmen (material exacto, aislamiento, horas de frío/calor,
 *  dimensiones, peso, garantía, envíos, devoluciones, colores reales, etc.)
 *
 *  IMPORTANTE: PIPOPE SHOPE vende termos "estilo Owala" adquiridos con
 *  proveedores mayoristas (referencia: donmayoreo.com). No se ha verificado
 *  que se trate de unidades originales de la marca Owala, por lo que el
 *  sitio NO debe presentarlos como productos oficiales Owala.
 * ----------------------------------------------------------------------------
 *  PRECIOS TEMPORALES
 * ----------------------------------------------------------------------------
 *  Todos los precios actuales están marcados con `priceIsPlaceholder: true`
 *  y se muestran en pantalla con la etiqueta "PRECIO TEMPORAL". Cuando
 *  definas tus precios finales, cambia el valor de `price` y pon
 *  `priceIsPlaceholder: false` en cada producto para que la etiqueta
 *  desaparezca automáticamente.
 * ============================================================================
 */

const PIPOPE_PRODUCTS = [
  {
    id: "termo-24oz",
    slug: "termo-24oz",
    name: "Termo PIPOPE SHOPE 24 oz",
    styleTag: "Estilo Owala — marca no verificada",

    capacityOz: 24,
    capacityMl: 710, // Conversión aproximada: 24 oz x 29.5735 ml ≈ 710 ml
    capacityVerified: true,

    // ---- PRECIOS (editar aquí) ----
    price: 349, // TEMPORAL / PLACEHOLDER — sustituir por precio definitivo en MXN
    compareAtPrice: null, // Ej: 449 para mostrar descuento tachado. null = sin promoción
    priceIsPlaceholder: true,
    currency: "MXN",

    // ---- IMÁGENES (editar aquí cuando tengas fotos propias) ----
    images: [
      "assets/products/termo-24oz/placeholder-1.svg"
    ],

    // ---- VARIANTES / COLORES ----
    // Sin colores confirmados todavía por el proveedor. Agrega objetos
    // { name: "Nombre del color", hex: "#RRGGBB", stock: n } cuando los tengas.
    colors: [],
    colorsStatus: "pending", // "pending" | "confirmed"

    // ---- STOCK ----
    stock: null, // null = aún no definido
    stockStatus: "pending", // "pending" | "in_stock" | "out_of_stock"

    description:
      "Termo de 24 oz de PIPOPE SHOPE, estilo Owala, ideal para el día a día: escuela, oficina o entrenamiento. Ficha técnica completa en proceso de confirmación con nuestro proveedor.",

    // Solo características verificables. No se listan materiales, aislamiento
    // ni tiempos de conservación de temperatura porque aún no están confirmados.
    features: [
      { label: "Capacidad", value: "24 oz (~710 ml aprox.)", verified: true },
      { label: "Tamaño", value: "Compacto, ideal para uso diario", verified: true }
    ],

    pendingSpecs: [
      "Material exacto",
      "Tecnología de aislamiento",
      "Horas de conservación de frío/calor",
      "Dimensiones y peso",
      "Colores disponibles",
      "Garantía"
    ]
  },
  {
    id: "termo-32oz",
    slug: "termo-32oz",
    name: "Termo PIPOPE SHOPE 32 oz",
    styleTag: "Estilo Owala — marca no verificada",

    capacityOz: 32,
    capacityMl: 946, // Conversión aproximada: 32 oz x 29.5735 ml ≈ 946 ml
    capacityVerified: true,

    // ---- PRECIOS (editar aquí) ----
    price: 399, // TEMPORAL / PLACEHOLDER — sustituir por precio definitivo en MXN
    compareAtPrice: null,
    priceIsPlaceholder: true,
    currency: "MXN",

    // ---- IMÁGENES (editar aquí cuando tengas fotos propias) ----
    images: [
      "assets/products/termo-32oz/placeholder-1.svg"
    ],

    // ---- VARIANTES / COLORES ----
    colors: [],
    colorsStatus: "pending",

    // ---- STOCK ----
    stock: null,
    stockStatus: "pending",

    description:
      "Termo de 32 oz de PIPOPE SHOPE, estilo Owala, pensado para quienes necesitan mayor capacidad durante el día. Ficha técnica completa en proceso de confirmación con nuestro proveedor.",

    features: [
      { label: "Capacidad", value: "32 oz (~946 ml aprox.)", verified: true },
      { label: "Tamaño", value: "Mayor capacidad para jornadas largas", verified: true }
    ],

    pendingSpecs: [
      "Material exacto",
      "Tecnología de aislamiento",
      "Horas de conservación de frío/calor",
      "Dimensiones y peso",
      "Colores disponibles",
      "Garantía"
    ]
  }
];

// Exponer globalmente (el sitio no usa un bundler, se sirve como HTML estático)
window.PIPOPE_PRODUCTS = PIPOPE_PRODUCTS;
