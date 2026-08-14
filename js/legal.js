/**
 * ============================================================================
 *  LEGAL — PIPOPSHOP
 * ============================================================================
 *  Script ligero para las páginas legales (legal/*.html). Estas páginas NO
 *  cargan el carrito ni el catálogo (no los necesitan), pero sí replican el
 *  footer real del sitio — así que este archivo solo activa los enlaces de
 *  WhatsApp/Instagram del footer, leyendo la misma fuente de datos que usa
 *  la tienda: js/data/futureIntegrations.js.
 *
 *  Si cambias la lógica de esos enlaces en js/main.js (función
 *  initFutureIntegrations), refleja el mismo cambio aquí para que el footer
 *  se comporte igual en todas las páginas.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  const config = window.PIPOPE_FUTURE_INTEGRATIONS;
  if (!config) return;

  const waEnabled = Boolean(
    config.whatsapp && config.whatsapp.enabled && config.whatsapp.phoneNumber
  );
  if (waEnabled) {
    const footerWaLink = document.getElementById("footer-whatsapp-link");
    if (footerWaLink) {
      const message = encodeURIComponent(config.whatsapp.defaultMessage || "");
      footerWaLink.href = `https://wa.me/${config.whatsapp.phoneNumber}?text=${message}`;
      footerWaLink.style.display = "block";
    }
  }

  const igEnabled = Boolean(config.instagram && config.instagram.enabled && config.instagram.url);
  if (igEnabled) {
    const footerIgLink = document.getElementById("footer-instagram-link");
    const footerIgHandle = document.getElementById("footer-instagram-handle");
    if (footerIgLink) {
      footerIgLink.href = config.instagram.url;
      footerIgLink.style.display = "flex";
      if (footerIgHandle) {
        footerIgHandle.textContent = config.instagram.handle ? `@${config.instagram.handle}` : config.instagram.url;
      }
    }
  }
});
