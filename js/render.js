/**
 * ============================================================================
 *  RENDER — PIPOPSHOP
 * ============================================================================
 *  Funciones que pintan HTML a partir de los datos de
 *  js/data/products.js, js/data/wholesale.js y del estado de js/cart.js.
 * ============================================================================
 */

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "MXN"
  }).format(amount);
}

function renderProductCard(product) {
  const priceTag = product.priceIsPlaceholder
    ? `<span class="price-placeholder-tag">PRECIO TEMPORAL</span>`
    : "";

  const compareAt =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? `<span class="price-compare">${formatMoney(product.compareAtPrice, product.currency)}</span>`
      : "";

  const promoActive = Boolean(product.promotion && product.promotion.active);

  const promoBadge = promoActive
    ? `<span class="promo-badge">${product.promotion.label}</span>`
    : "";

  const promoValidity =
    promoActive && product.promotion.validityText
      ? `<p class="promo-validity">${product.promotion.validityText}</p>`
      : "";

  const defaultColor = product.colors.find((c) => c.image === product.images[0]);

  const colorLabel =
    product.colorsStatus === "confirmed" && defaultColor
      ? `<p class="color-label" data-role="color-label">Color: <strong>${defaultColor.name}</strong></p>`
      : "";

  const colorsBlock =
    product.colorsStatus === "confirmed" && product.colors.length
      ? `<div class="option-swatches">
          ${product.colors
            .map(
              (c) =>
                `<button type="button" class="swatch${c === defaultColor ? " selected" : ""}" style="background:${c.hex}" title="${c.name}" data-color="${c.name}" data-image="${c.image}"></button>`
            )
            .join("")}
        </div>`
      : `<p class="pending-text small">Colores: por confirmar</p>`;

  const featuresBlock = product.features
    .map((f) => `<li><strong>${f.label}:</strong> ${f.value}</li>`)
    .join("");

  const pendingSpecsBlock = product.pendingSpecs && product.pendingSpecs.length
    ? `<details class="spec-details">
        <summary>Ver ficha técnica completa</summary>
        <p>Pendientes de confirmar con el proveedor: ${product.pendingSpecs.join(", ")}.</p>
      </details>`
    : "";

  return `
    <article class="product-card reveal" data-product-id="${product.id}">
      <div class="product-media">
        <img src="${product.images[0]}" alt="${product.name}${defaultColor ? " — color " + defaultColor.name : " (imagen provisional)"}" loading="lazy" class="product-media-img" />
        <span class="style-tag">${product.styleTag}</span>
        ${promoBadge}
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-capacity">${product.capacityOz} oz &middot; ~${product.capacityMl} ml aprox.</p>

        <div class="product-price">
          <span class="price-current">${formatMoney(product.price, product.currency)}</span>
          ${compareAt}
          ${priceTag}
        </div>
        ${promoValidity}

        <p class="product-description">${product.description}</p>

        <ul class="product-features">${featuresBlock}</ul>
        ${pendingSpecsBlock}

        ${colorLabel}
        ${colorsBlock}

        <div class="product-actions">
          <div class="qty-selector">
            <button type="button" class="qty-btn qty-minus" aria-label="Disminuir cantidad">&minus;</button>
            <input type="number" class="qty-input" value="1" min="1" max="99" inputmode="numeric" />
            <button type="button" class="qty-btn qty-plus" aria-label="Aumentar cantidad">+</button>
          </div>
          <button type="button" class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = window.PIPOPE_PRODUCTS.map(renderProductCard).join("");
}

const FAQ_ITEMS = [
  {
    q: "¿Cuál es la diferencia entre el termo de 24 oz y el de 32 oz?",
    a: "Principalmente la capacidad: el de 24 oz equivale a ~710 ml aproximados y el de 32 oz a ~946 ml aproximados. El resto de la ficha técnica (material, aislamiento, etc.) está en proceso de confirmación."
  },
  {
    q: "¿Qué capacidad tiene cada modelo?",
    a: "Manejamos dos capacidades en tienda en línea: 24 oz y 32 oz. También manejamos 20 oz, 40 oz y modelo Tumbler por pedido de mayoreo — ver sección Mayoreo."
  },
  {
    q: "¿Cómo debo cuidar mi termo?",
    a: "Estamos confirmando las recomendaciones de cuidado con nuestro proveedor. Esta sección se actualizará en cuanto tengamos la información verificada — contenido pendiente."
  },
  {
    q: "¿Cómo se realizan las entregas?",
    a: "Nuestra política de envíos todavía está en definición. Contenido pendiente — se publicará antes de habilitar compras reales."
  },
  {
    q: "¿Cuándo estará disponible un color específico?",
    a: "Ambos modelos están disponibles en 10 colores: azul marino, azul rey, blanco, cactus, morado, naranja, negro, piel, rosa y verde. Puedes elegir el color desde la tarjeta de cada producto antes de agregarlo al carrito."
  }
];

/**
 * Genera un acordeón de preguntas frecuentes en cualquier contenedor.
 * Reutilizado tanto por el FAQ general como por el mini-FAQ de Mayoreo.
 */
function renderFaqList(items, containerId) {
  const list = document.getElementById(containerId);
  if (!list) return;
  list.innerHTML = items
    .map(
      (item, idx) => `
    <div class="faq-item">
      <button type="button" class="faq-question" data-faq-index="${idx}">
        <span>${item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    </div>
  `
    )
    .join("");
}

function renderFaq() {
  renderFaqList(FAQ_ITEMS, "faq-list");
}

/**
 * ============================================================================
 *  MAYOREO
 * ============================================================================
 */
function renderWholesale() {
  const tableBody = document.getElementById("wholesale-table-body");
  const cardsWrap = document.getElementById("wholesale-price-cards");
  const rulesNote = document.getElementById("wholesale-rules-note");
  if (!tableBody || !cardsWrap) return;

  const tiers = window.PIPOPE_WHOLESALE_TIERS || [];
  const rules = window.PIPOPE_WHOLESALE_RULES || {};

  tableBody.innerHTML = tiers
    .map(
      (t) => `
      <tr>
        <td>
          ${t.label}
          ${
            t.availableOnline
              ? `<span class="availability-tag">En tienda en línea</span>`
              : `<span class="availability-tag is-order-only">Disponible por pedido</span>`
          }
        </td>
        <td class="price-cell">${formatMoney(t.price, rules.currency)} <span style="font-weight:400;font-size:12px;color:var(--color-muted)">/ pieza</span></td>
      </tr>
    `
    )
    .join("");

  cardsWrap.innerHTML = tiers
    .map(
      (t) => `
      <div class="wholesale-price-card">
        <div>
          <span class="wholesale-price-card-name">${t.label}</span>
          <span class="wholesale-price-card-tag">${t.availableOnline ? "En tienda en línea" : "Disponible por pedido"}</span>
        </div>
        <span class="wholesale-price-card-price">${formatMoney(t.price, rules.currency)}</span>
      </div>
    `
    )
    .join("");

  if (rulesNote) {
    rulesNote.innerHTML = `
      Pedido mínimo de <strong>${rules.minUnits} piezas</strong>, combinables libremente entre
      cualquier modelo y color. El precio de mayoreo aplica automático desde la pieza
      número ${rules.minUnits}. ¿Pedido más grande? Te preparamos una
      <strong>cotización personalizada por WhatsApp</strong>.
    `;
  }

  renderFaqList(window.PIPOPE_WHOLESALE_FAQ || [], "wholesale-faq-list");
}

/**
 * ============================================================================
 *  CARRITO
 * ============================================================================
 */
function renderCartDrawer(state) {
  const itemsEl = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  if (!itemsEl) return;

  if (state.items.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
  } else {
    itemsEl.innerHTML = state.items
      .map((item) => {
        const selectedColor = item.colorName
          ? item.product.colors.find((c) => c.name === item.colorName)
          : null;
        const itemImage = selectedColor ? selectedColor.image : item.product.images[0];
        return `
        <div class="cart-item" data-product-id="${item.productId}" data-color="${item.colorName || ""}">
          <img src="${itemImage}" alt="${item.product.name}" />
          <div class="cart-item-info">
            <p class="cart-item-name">${item.product.name}</p>
            <p class="cart-item-meta">${item.product.capacityOz} oz${item.colorName ? " · " + item.colorName : ""}</p>
            <div class="qty-selector qty-selector-sm">
              <button type="button" class="qty-btn cart-qty-minus" aria-label="Disminuir cantidad">&minus;</button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button type="button" class="qty-btn cart-qty-plus" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span>${formatMoney(item.lineTotal, item.product.currency)}</span>
            <button type="button" class="cart-remove-btn" aria-label="Eliminar producto">&times;</button>
          </div>
        </div>
      `;
      })
      .join("");
  }

  if (subtotalEl) subtotalEl.textContent = formatMoney(state.subtotal, "MXN");
  if (totalEl) totalEl.textContent = formatMoney(state.total, "MXN");
  if (countEl) countEl.textContent = String(state.totalUnits);

  const cartWaBtn = document.getElementById("cart-whatsapp-btn");
  if (cartWaBtn) cartWaBtn.disabled = state.items.length === 0;
}
