/**
 * ============================================================================
 *  MAYOREO — PIPOPSHOP
 * ============================================================================
 *  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR PARA CAMBIAR LAS REGLAS Y
 *  PRECIOS DE MAYOREO. La sección "Mayoreo" del sitio se dibuja a partir
 *  de estos datos — no hace falta tocar HTML.
 *
 *  Reglas confirmadas por PIPOPSHOP (2026):
 *    - Pedido mínimo: 5 piezas.
 *    - Las 5 piezas se pueden combinar libremente entre modelos y colores.
 *    - El precio de mayoreo aplica automático a partir de 5 piezas.
 *    - Para cantidades mayores, se invita a pedir una cotización
 *      personalizada por WhatsApp (puede incluir mejores precios por volumen,
 *      pero esas condiciones se definen caso por caso, no están fijas aquí).
 * ============================================================================
 */

const PIPOPE_WHOLESALE_RULES = {
  minUnits: 5,
  combinable: true,
  autoAppliesAtMin: true,
  customQuoteAboveMin: true,
  currency: "MXN"
};

/**
 * Precio de mayoreo por pieza. `availableOnline: true` solo para los
 * modelos que hoy tienen ficha propia en la tienda (24 oz y 32 oz).
 * Los demás son datos reales de precio dados por el negocio, pero aún
 * sin foto/ficha individual — se muestran como "Disponible por pedido".
 */
const PIPOPE_WHOLESALE_TIERS = [
  { id: "ow-20oz", label: "OW 20 oz", price: 425, availableOnline: false },
  { id: "ow-24oz", label: "OW 24 oz", price: 475, availableOnline: true },
  { id: "ow-32oz", label: "OW 32 oz", price: 530, availableOnline: true },
  { id: "ow-40oz", label: "OW 40 oz", price: 585, availableOnline: false },
  { id: "ow-tumbler", label: "OW Tumbler", price: 630, availableOnline: false }
];

const PIPOPE_WHOLESALE_FAQ = [
  {
    q: "¿Puedo combinar modelos y colores para llegar al mínimo?",
    a: "Sí. Las 5 piezas mínimas se pueden combinar libremente entre cualquier modelo y color disponible — no tienen que ser iguales."
  },
  {
    q: "¿Necesito pedir más de 5 piezas para tener precio de mayoreo?",
    a: "No. El precio de mayoreo aplica automáticamente desde la pieza número 5."
  },
  {
    q: "¿Y si quiero un pedido más grande?",
    a: "Para cantidades mayores te preparamos una cotización personalizada por WhatsApp."
  },
  {
    q: "¿Cómo hago un pedido de mayoreo?",
    a: "Escríbenos por WhatsApp con los modelos, colores y cantidades que buscas y te confirmamos disponibilidad y forma de pago/entrega."
  }
];

window.PIPOPE_WHOLESALE_RULES = PIPOPE_WHOLESALE_RULES;
window.PIPOPE_WHOLESALE_TIERS = PIPOPE_WHOLESALE_TIERS;
window.PIPOPE_WHOLESALE_FAQ = PIPOPE_WHOLESALE_FAQ;
