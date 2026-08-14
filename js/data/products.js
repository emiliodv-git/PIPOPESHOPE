/**
 * ============================================================================
 *  CATÁLOGO DE PRODUCTOS — PIPOPSHOP
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
 *  IMPORTANTE: PIPOPSHOP vende termos "estilo Owala" adquiridos con
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

/**
 * ----------------------------------------------------------------------------
 *  COLORES DISPONIBLES (fotografías reales del catálogo del proveedor)
 * ----------------------------------------------------------------------------
 *  Origen: carpeta "FOTOS CATALOGO-OWALAS" proporcionada directamente por
 *  PIPOPSHOP. Los mismos 10 colores aplican tanto al termo de 24 oz como
 *  al de 32 oz. Para agregar/quitar un color, edita este arreglo — se
 *  actualiza automáticamente en ambos productos.
 */
const PIPOPE_COLORS = [
  { name: "Azul marino", hex: "#1D4E58", image: "assets/products/colors/ow-azul-marino.png" },
  { name: "Azul rey", hex: "#2E3FC4", image: "assets/products/colors/ow-azul-rey.png" },
  { name: "Blanco", hex: "#F1EEDD", image: "assets/products/colors/ow-blanco.png" },
  { name: "Cactus", hex: "#A9C58B", image: "assets/products/colors/ow-cactus.png" },
  { name: "Morado", hex: "#8D82E0", image: "assets/products/colors/ow-morado.png" },
  { name: "Naranja", hex: "#F0532E", image: "assets/products/colors/ow-naranja.png" },
  { name: "Negro", hex: "#141414", image: "assets/products/colors/ow-negro.png" },
  { name: "Piel", hex: "#F6CDB4", image: "assets/products/colors/ow-piel.png" },
  { name: "Rosa", hex: "#E8447D", image: "assets/products/colors/ow-rosa.png" },
  { name: "Verde", hex: "#2FB6B4", image: "assets/products/colors/ow-verde.png" }
];

const PIPOPE_PRODUCTS = [
  {
    id: "termo-24oz",
    slug: "termo-24oz",
    name: "Termo PIPOPSHOP 24 oz",
    styleTag: "Estilo Owala",

    capacityOz: 24,
    capacityMl: 710, // Conversión aproximada: 24 oz x 29.5735 ml ≈ 710 ml
    capacityVerified: true,

    // ---- PRECIOS (editar aquí) ----
    price: 500, // Precio de oferta en MXN
    compareAtPrice: 620, // Precio original (se muestra tachado)
    priceIsPlaceholder: false,
    currency: "MXN",

    // ---- PROMOCIÓN (editar/desactivar aquí) ----
    promotion: {
      active: true,
      label: "Promoción",
      validityText: "Válida durante todo 2026"
    },

    // ---- IMÁGENES (editar aquí cuando tengas fotos propias) ----
    images: [
      "assets/products/colors/ow-naranja.png"
    ],

    // ---- VARIANTES / COLORES ----
    colors: PIPOPE_COLORS,
    colorsStatus: "confirmed", // "pending" | "confirmed"

    // ---- STOCK ----
    stock: null, // null = aún no definido
    stockStatus: "pending", // "pending" | "in_stock" | "out_of_stock"

    description:
      "Termo de 24 oz de PIPOPSHOP, estilo Owala, ideal para el día a día: escuela, oficina o entrenamiento. Ficha técnica completa en proceso de confirmación con nuestro proveedor.",

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
      "Garantía"
    ]
  },
  {
    id: "termo-32oz",
    slug: "termo-32oz",
    name: "Termo PIPOPSHOP 32 oz",
    styleTag: "Estilo Owala",

    capacityOz: 32,
    capacityMl: 946, // Conversión aproximada: 32 oz x 29.5735 ml ≈ 946 ml
    capacityVerified: true,

    // ---- PRECIOS (editar aquí) ----
    price: 550, // Precio de oferta en MXN
    compareAtPrice: 670, // Precio original (se muestra tachado)
    priceIsPlaceholder: false,
    currency: "MXN",

    // ---- PROMOCIÓN (editar/desactivar aquí) ----
    promotion: {
      active: true,
      label: "Promoción",
      validityText: "Válida durante todo 2026"
    },

    // ---- IMÁGENES (editar aquí cuando tengas fotos propias) ----
    images: [
      "assets/products/colors/ow-verde.png"
    ],

    // ---- VARIANTES / COLORES ----
    colors: PIPOPE_COLORS,
    colorsStatus: "confirmed",

    // ---- STOCK ----
    stock: null,
    stockStatus: "pending",

    description:
      "Termo de 32 oz de PIPOPSHOP, estilo Owala, pensado para quienes necesitan mayor capacidad durante el día. Ficha técnica completa en proceso de confirmación con nuestro proveedor.",

    features: [
      { label: "Capacidad", value: "32 oz (~946 ml aprox.)", verified: true },
      { label: "Tamaño", value: "Mayor capacidad para jornadas largas", verified: true }
    ],

    pendingSpecs: [
      "Material exacto",
      "Tecnología de aislamiento",
      "Horas de conservación de frío/calor",
      "Dimensiones y peso",
      "Garantía"
    ]
  }
];

// Exponer globalmente (el sitio no usa un bundler, se sirve como HTML estático)
window.PIPOPE_PRODUCTS = PIPOPE_PRODUCTS;
