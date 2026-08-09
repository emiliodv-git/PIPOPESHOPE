/**
 * ============================================================================
 *  INTEGRACIONES FUTURAS — PIPOPE SHOPE
 * ============================================================================
 *  Este archivo centraliza TODO lo que todavía no está activo en el sitio:
 *  WhatsApp, redes sociales, contacto, y pasarelas de pago/checkout real.
 *
 *  Nada de esto se muestra en la página todavía (enabled: false). Cuando
 *  tengas la información real, cambia los valores y pon `enabled: true`
 *  en el bloque correspondiente. Los componentes de UI (footer, botón
 *  flotante de WhatsApp, checkout) ya están preparados para leer de aquí
 *  — busca los comentarios "INTEGRACIÓN FUTURA" en index.html y js/main.js.
 * ============================================================================
 */

const PIPOPE_FUTURE_INTEGRATIONS = {
  whatsapp: {
    enabled: false,
    phoneNumber: "", // Ej: "521XXXXXXXXXX"
    defaultMessage: "Hola, quiero información sobre los termos PIPOPE SHOPE"
  },

  instagram: {
    enabled: false,
    // Cuenta ya reservada: @pipope_shope — NO mostrar en el sitio todavía
    // (instrucción explícita: aún no se debe usar Instagram dentro de la página).
    handle: "",
    showFeed: false
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
