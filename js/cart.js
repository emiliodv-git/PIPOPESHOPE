/**
 * ============================================================================
 *  CARRITO — PIPOPE SHOPE
 * ============================================================================
 *  Carrito de compras 100% frontend, persistido en localStorage.
 *  NO procesa pagos reales todavía (ver js/data/futureIntegrations.js).
 * ============================================================================
 */

const PIPOPE_CART_STORAGE_KEY = "pipope_cart_v1";

const Cart = (function () {
  let items = [];
  let listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(PIPOPE_CART_STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      items = [];
    }
  }

  function persist() {
    localStorage.setItem(PIPOPE_CART_STORAGE_KEY, JSON.stringify(items));
    notify();
  }

  function notify() {
    listeners.forEach((fn) => fn(getState()));
  }

  function findProduct(productId) {
    return window.PIPOPE_PRODUCTS.find((p) => p.id === productId);
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function addItem(productId, quantity = 1, colorName = null) {
    const product = findProduct(productId);
    if (!product) return;

    const existing = items.find(
      (i) => i.productId === productId && i.colorName === colorName
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ productId, quantity, colorName });
    }
    persist();
  }

  function updateQuantity(productId, colorName, quantity) {
    const item = items.find(
      (i) => i.productId === productId && i.colorName === colorName
    );
    if (!item) return;

    if (quantity <= 0) {
      removeItem(productId, colorName);
      return;
    }
    item.quantity = quantity;
    persist();
  }

  function removeItem(productId, colorName) {
    items = items.filter(
      (i) => !(i.productId === productId && i.colorName === colorName)
    );
    persist();
  }

  function clear() {
    items = [];
    persist();
  }

  function getState() {
    const detailedItems = items
      .map((i) => {
        const product = findProduct(i.productId);
        if (!product) return null;
        const lineTotal = product.price * i.quantity;
        return {
          productId: i.productId,
          colorName: i.colorName,
          quantity: i.quantity,
          product,
          lineTotal
        };
      })
      .filter(Boolean);

    const subtotal = detailedItems.reduce((sum, i) => sum + i.lineTotal, 0);
    const totalUnits = detailedItems.reduce((sum, i) => sum + i.quantity, 0);

    return {
      items: detailedItems,
      subtotal,
      total: subtotal, // Sin envío/impuestos definidos todavía: total = subtotal
      totalUnits
    };
  }

  load();

  return {
    addItem,
    updateQuantity,
    removeItem,
    clear,
    getState,
    onChange
  };
})();

window.Cart = Cart;
