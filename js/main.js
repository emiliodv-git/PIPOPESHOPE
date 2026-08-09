/**
 * ============================================================================
 *  MAIN — PIPOPE SHOPE
 * ============================================================================
 *  Inicializa el sitio: pinta catálogo/FAQ, conecta el carrito y maneja
 *  interacciones de UI (menú móvil, drawer del carrito, acordeón FAQ).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderFaq();

  Cart.onChange(renderCartDrawer);
  renderCartDrawer(Cart.getState());

  initMobileMenu();
  initCartDrawer();
  initProductGridEvents();
  initFaqAccordion();
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
}

function initProductGridEvents() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".product-card");
    if (!card) return;

    if (e.target.closest(".swatch")) {
      card.querySelectorAll(".swatch").forEach((s) => s.classList.remove("selected"));
      e.target.closest(".swatch").classList.add("selected");
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
      setTimeout(() => {
        addBtn.textContent = "Agregar al carrito";
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

function initFaqAccordion() {
  const list = document.getElementById("faq-list");
  if (!list) return;

  list.addEventListener("click", function (e) {
    const question = e.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item");
    item.classList.toggle("open");
  });
}

/**
 * INTEGRACIÓN FUTURA: activa el botón flotante de WhatsApp (y en el futuro,
 * otros bloques de contacto) leyendo js/data/futureIntegrations.js.
 * Mientras `enabled` sea false en ese archivo, no se muestra nada.
 */
function initFutureIntegrations() {
  const config = window.PIPOPE_FUTURE_INTEGRATIONS;
  if (!config) return;

  const waBtn = document.getElementById("whatsapp-float");
  if (waBtn && config.whatsapp && config.whatsapp.enabled && config.whatsapp.phoneNumber) {
    const message = encodeURIComponent(config.whatsapp.defaultMessage || "");
    waBtn.href = `https://wa.me/${config.whatsapp.phoneNumber}?text=${message}`;
    waBtn.style.display = "flex";
  }
}
