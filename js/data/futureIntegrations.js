/**
 * ============================================================================
 *  INTEGRACIONES FUTURAS — PIPOPSHOP
 * ============================================================================
 *  Este archivo centraliza TODO lo que todavía no está activo en el sitio:
 *  WhatsApp, redes sociales, contacto, y pasarelas de pago/checkout real.
 *
 *  Cada bloque se activa de forma independiente con `enabled: true` +
 *  sus datos reales. WhatsApp ya está activo (ver bloque `whatsapp`).
 *  El resto sigue oculto hasta que definas su información. Los
 *  componentes de UI (footer, botón flotante, carrito, sección Mayoreo,
 *  checkout) ya están preparados para leer de aquí — busca los
 *  comentarios "INTEGRACIÓN FUTURA" en index.html, js/main.js y js/render.js.
 * ============================================================================
 */

const PIPOPE_FUTURE_INTEGRATIONS = {
  whatsapp: {
    enabled: true,
    phoneNumber: "522227821556", // Confirmado por PIPOPSHOP
    defaultMessage: "Hola, quiero información sobre los termos PIPOPSHOP"
  },

  instagram: {
    enabled: true,
    handle: "pipop_shope",
    url: "https://www.instagram.com/pipop_shope/", // Perfil oficial confirmado
    showFeed: false // Feed embebido: preparado para el futuro, no implementado todavía
  },

  tiktok: {
    enabled: false,
    handle: ""
  },

  facebook: {
    enabled: false,
    url: ""
  },

  contactForm: {
    enabled: false,
    submitEndpoint: "" // Definir servicio de envío (email, Formspree, backend propio, etc.)
  },

  physicalAddress: {
    enabled: false,
    address: ""
  },

  payments: {
    // Checkout real todavía NO está implementado. El carrito actual es
    // solo frontend/demostrativo, no procesa cobros.
    mercadoPago: { enabled: false, publicKey: "" },
    paypal: { enabled: false, clientId: "" },
    stripe: { enabled: false, publicKey: "" }
  },

  branding: {
    // Sustituir por el logo definitivo cuando esté listo.
    finalLogoReady: false,
    logoPath: "assets/logo/logo-placeholder.svg"
  }
};

window.PIPOPE_FUTURE_INTEGRATIONS = PIPOPE_FUTURE_INTEGRATIONS;
