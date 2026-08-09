/**
 * ============================================================================
 *  RENDER — PIPOPE SHOPE
 * ============================================================================
 *  Funciones que pintan HTML a partir de los datos de
 *  js/data/products.js y del estado de js/cart.js.
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

  const colorsBlock =
    product.colorsStatus === "confirmed" && product.colors.length
      ? `<div class="option-swatches">
          ${product.colors
            .map(
              (c) =>
                `<button type="button" class="swatch" style="background:${c.hex}" title="${c.name}" data-color="${c.name}"></button>`
            )
            .join("")}
        </div>`
      : `<p class="pending-text small">Colores: por confirmar</p>`;

  const featuresBlock = product.features
    .map((f) => `<li><strong>${f.label}:</strong> ${f.value}</li>`)
    .join("");

  const pendingSpecsBlock = product.pendingSpecs && product.pendingSpecs.length
    ? `<p class="pending-text small">Pendientes de confirmar: ${product.pendingSpecs.join(", ")}</p>`
    : "";

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-media">
        <img src="${product.images[0]}" alt="${product.name} (imagen provisional)" loading="lazy" />
        <span class="style-tag">${product.styleTag}</span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-capacity">${product.capacityOz} oz &middot; ~${product.capacityMl} ml aprox.</p>

        <div class="product-price">
          <span class="price-current">${formatMoney(product.price, product.currency)}</span>
          ${compareAt}
          ${priceTag}
        </div>

        <p class="product-description">${product.description}</p>

        <ul class="product-features">${featuresBlock}</ul>
        ${pendingSpecsBlock}

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
    a: "Manejamos dos capacidades: 24 oz y 32 oz."
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
    a: "Los colores y variantes disponibles están por confirmarse con nuestro proveedor. Contenido pendiente."
  }
];

function renderFaq() {
  const list = document.getElementById("faq-list");
  if (!list) return;
  list.innerHTML = FAQ_ITEMS.map(
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
  ).join("");
}

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
      .map(
        (item) => `
        <div class="cart-item" data-product-id="${item.productId}" data-color="${item.colorName || ""}">
          <img src="${item.product.images[0]}" alt="${item.product.name}" />
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
      `
      )
      .join("");
  }

  if (subtotalEl) subtotalEl.textContent = formatMoney(state.subtotal, "MXN");
  if (totalEl) totalEl.textContent = formatMoney(state.total, "MXN");
  if (countEl) countEl.textContent = String(state.totalUnits);
}
