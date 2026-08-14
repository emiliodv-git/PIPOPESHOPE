/**
 * ============================================================================
 *  MAIN — PIPOPSHOP
 * ============================================================================
 *  Inicializa el sitio: pinta catálogo/FAQ/mayoreo, conecta el carrito y
 *  maneja interacciones de UI (menú móvil, drawer del carrito, acordeones,
 *  animaciones de scroll y mensajes de WhatsApp).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderFaq();
  renderWholesale();

  Cart.onChange(renderCartDrawer);
  renderCartDrawer(Cart.getState());

  initMobileMenu();
  initCartDrawer();
  initProductGridEvents();
  initFaqAccordion(); // delega también en el mini-FAQ de Mayoreo
  initHeaderShadow();
  initScrollReveal();
  initFutureIntegrations();
});

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initHeaderShadow() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/**
 * Revela secciones/tarjetas con una transición suave al entrar en pantalla.
 * Si el navegador no soporta IntersectionObserver, todo queda visible
 * de inmediato (degradación seguraya — nunca oculta contenido para siempre).
 */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  const openBtn = document.getElementById("cart-toggle");
  const closeBtn = document.getElementById("cart-close");
  if (!drawer || !overlay || !openBtn || !closeBtn) return;

  function open() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  }
  function close() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  drawer.addEventListener("click", function (e) {
    const item = e.target.closest(".cart-item");
    if (!item) return;
    const productId = item.dataset.productId;
    const colorName = item.dataset.color || null;

    if (e.target.closest(".cart-qty-plus")) {
      const current = Cart.getState().items.find(
        (i) => i.productId === productId && (i.colorName || null) === colorName
      );
      if (current) Cart.updateQuantity(productId, colorName, current.quantity + 1);
    }
    if (e.target.closest(".cart-qty-minus")) {
      const current = Cart.getState().items.find(
        (i) => i.productId === productId && (i.colorName || null) === colorName
      );
      if (current) Cart.updateQuantity(productId, colorName, current.quantity - 1);
    }
    if (e.target.closest(".cart-remove-btn")) {
      Cart.removeItem(productId, colorName);
    }
  });

  // Pequeña animación en el contador del carrito cada vez que cambia.
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    Cart.onChange(function () {
      countEl.classList.remove("bump");
      // Forzar reflow para poder re-disparar la animación en clics seguidos.
      void countEl.offsetWidth;
      countEl.classList.add("bump");
    });
  }
}

function initProductGridEvents() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const swatchBtn = e.target.closest(".swatch");
    if (swatchBtn) {
      card.querySelectorAll(".swatch").forEach((s) => s.classList.remove("selected"));
      swatchBtn.classList.add("selected");

      const image = swatchBtn.dataset.image;
      const colorName = swatchBtn.dataset.color;
      const mediaImg = card.querySelector(".product-media-img");
      const colorLabel = card.querySelector('[data-role="color-label"]');
      const productName = card.querySelector(".product-name").textContent;

      if (image && mediaImg) {
        mediaImg.classList.add("is-swapping");
        setTimeout(() => {
          mediaImg.src = image;
          mediaImg.alt = `${productName} — color ${colorName}`;
          mediaImg.classList.remove("is-swapping");
        }, 160);
      }
      if (colorLabel) {
        colorLabel.innerHTML = `Color: <strong>${colorName}</strong>`;
      }
      return;
    }

    const qtyInput = card.querySelector(".qty-input");

    if (e.target.closest(".qty-plus")) {
      qtyInput.value = Math.min(99, parseInt(qtyInput.value || "1", 10) + 1);
      return;
    }
    if (e.target.closest(".qty-minus")) {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
      return;
    }

    const addBtn = e.target.closest(".add-to-cart-btn");
    if (addBtn) {
      const productId = addBtn.dataset.productId;
      const quantity = Math.max(1, parseInt(qtyInput.value || "1", 10));
      const selectedSwatch = card.querySelector(".swatch.selected");
      const colorName = selectedSwatch ? selectedSwatch.dataset.color : null;

      Cart.addItem(productId, quantity, colorName);

      addBtn.textContent = "Agregado ✓";
      addBtn.classList.add("is-added");
      setTimeout(() => {
        addBtn.textContent = "Agregar al carrito";
        addBtn.classList.remove("is-added");
      }, 1200);
    }
  });

  grid.addEventListener("change", function (e) {
    if (e.target.classList.contains("qty-input")) {
      const value = Math.min(99, Math.max(1, parseInt(e.target.value || "1", 10)));
      e.target.value = value;
    }
  });
}

/**
 * Acordeón reutilizable: funciona tanto para el FAQ general (#faq-list)
 * como para el mini-FAQ de Mayoreo (#wholesale-faq-list), delegando en
 * document para no depender de que el contenedor ya exista al cargar.
 */
function initFaqAccordion() {
  document.addEventListener("click", function (e) {
    const question = e.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item");
    item.classList.toggle("open");
  });
}

/**
 * ============================================================================
 *  MENSAJES DE WHATSAPP
 * ============================================================================
 */
function buildOrderWhatsAppMessage(state) {
  const lines = ["Hola PIPOPSHOP 👋 Quiero hacer este pedido:", ""];

  state.items.forEach((item) => {
    const colorPart = item.colorName ? ` — ${item.colorName}` : "";
    lines.push(
      `• ${item.product.name}${colorPart} — x${item.quantity} — ${formatMoney(item.product.price, item.product.currency)} c/u = ${formatMoney(item.lineTotal, item.product.currency)}`
    );
  });

  lines.push("");
  lines.push(`Subtotal: ${formatMoney(state.subtotal, "MXN")}`);
  lines.push(`Total: ${formatMoney(state.total, "MXN")}`);
  lines.push("");
  lines.push("¿Me confirman disponibilidad y cómo continuar? ¡Gracias!");

  return lines.join("\n");
}

function buildWholesaleQuoteMessage() {
  const min = (window.PIPOPE_WHOLESALE_RULES && window.PIPOPE_WHOLESALE_RULES.minUnits) || 5;
  return `Hola PIPOPSHOP 👋 Quiero cotizar un pedido de mayoreo (mínimo ${min} piezas, combinables entre modelos y colores). ¿Me ayudan con la cotización?`;
}

function openWhatsApp(phoneNumber, message) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/**
 * INTEGRACIÓN FUTURA / ACTIVA: lee js/data/futureIntegrations.js y activa
 * (o mantiene oculto) todo lo relacionado a WhatsApp (botón flotante,
 * carrito, cotización de Mayoreo) e Instagram (ícono del header, footer,
 * sección "Síguenos" y QR). Mientras un bloque tenga `enabled: false` o le
 * falten datos, sus elementos permanecen ocultos — así se agregan TikTok,
 * Facebook y pagos más adelante sin romper nada de lo ya activo.
 */
function initFutureIntegrations() {
  const config = window.PIPOPE_FUTURE_INTEGRATIONS;
  if (!config) return;

  const waEnabled = Boolean(
    config.whatsapp && config.whatsapp.enabled && config.whatsapp.phoneNumber
  );
  const phoneNumber = waEnabled ? config.whatsapp.phoneNumber : null;

  const waFloatBtn = document.getElementById("whatsapp-float");
  if (waFloatBtn && waEnabled) {
    const message = encodeURIComponent(config.whatsapp.defaultMessage || "");
    waFloatBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
    waFloatBtn.style.display = "flex";
  }

  const footerWaLink = document.getElementById("footer-whatsapp-link");
  if (footerWaLink && waEnabled) {
    const message = encodeURIComponent(config.whatsapp.defaultMessage || "");
    footerWaLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
    footerWaLink.style.display = "block";
  }

  const cartWaBtn = document.getElementById("cart-whatsapp-btn");
  if (cartWaBtn) {
    if (waEnabled) {
      cartWaBtn.style.display = "flex";
      cartWaBtn.addEventListener("click", function () {
        const state = Cart.getState();
        if (!state.items.length) return;
        openWhatsApp(phoneNumber, buildOrderWhatsAppMessage(state));
      });
    } else {
      cartWaBtn.style.display = "none";
    }
  }

  const wholesaleCtaBtn = document.getElementById("wholesale-cta-btn");
  if (wholesaleCtaBtn) {
    if (waEnabled) {
      wholesaleCtaBtn.disabled = false;
      wholesaleCtaBtn.title = "";
      wholesaleCtaBtn.addEventListener("click", function () {
        openWhatsApp(phoneNumber, buildWholesaleQuoteMessage());
      });
    } else {
      wholesaleCtaBtn.disabled = true;
      wholesaleCtaBtn.title = "Próximamente";
    }
  }

  // ---- Instagram (mismo patrón: oculto hasta que enabled + url estén listos) ----
  const igEnabled = Boolean(config.instagram && config.instagram.enabled && config.instagram.url);
  if (igEnabled) {
    const igUrl = config.instagram.url;
    const igHandle = config.instagram.handle ? `@${config.instagram.handle}` : igUrl;

    const headerIgLink = document.getElementById("header-instagram-link");
    if (headerIgLink) {
      headerIgLink.href = igUrl;
      headerIgLink.style.display = "flex";
    }

    const footerIgLink = document.getElementById("footer-instagram-link");
    const footerIgHandle = document.getElementById("footer-instagram-handle");
    if (footerIgLink) {
      footerIgLink.href = igUrl;
      footerIgLink.style.display = "flex";
      if (footerIgHandle) footerIgHandle.textContent = igHandle;
    }

    const followBtn = document.getElementById("instagram-follow-btn");
    if (followBtn) {
      followBtn.href = igUrl;
      followBtn.style.display = "inline-flex";
    }

    const qrLink = document.getElementById("instagram-qr-link");
    const qrHandle = document.getElementById("instagram-qr-handle");
    if (qrLink) {
      qrLink.href = igUrl;
      qrLink.style.display = "block";
      if (qrHandle) qrHandle.textContent = igHandle;
    }
  }
}
