# PIPOPSHOP — Sitio web (v2 — rediseño)

Tienda en línea de **PIPOPSHOP**: termos estilo Owala en 24 oz y 32 oz para México (MXN), con venta por mayoreo desde 5 piezas.

---

## 1. Qué se construyó en este rediseño

- **Rediseño visual completo**: sistema de diseño con tokens (espaciados, sombras, radios, tiempos de transición), animaciones suaves al hacer scroll (`IntersectionObserver`, con degradación segura y respeto a `prefers-reduced-motion`), tarjetas de producto más limpias (ficha técnica pendiente ahora es un detalle plegable en vez de texto suelto), sombra de header al hacer scroll, franja de confianza en el Hero con datos reales.
- **Nueva sección de Mayoreo** (`#mayoreo`): explicación del proceso en 3 pasos, tabla de precios (tarjetas apiladas en móvil, tabla en desktop — mismos datos, sin duplicar lógica), nota de reglas, mini-FAQ y botón "Solicitar cotización por WhatsApp".
- **Carrito mejorado**: miniaturas, cantidades, subtotal/total (ya existían) + nuevo botón **"Enviar pedido por WhatsApp"** que arma un mensaje formateado con cada producto, color, cantidad, precio unitario, línea de total, subtotal y total.
- **WhatsApp activado**: botón flotante, botón del carrito, botón de cotización de mayoreo y enlace en el footer, todos leyendo el mismo número desde un solo archivo de configuración.
- Todo lo anterior (catálogo, carrito, colores, promociones, menú móvil, FAQ) **se mantiene funcionando igual que antes** — nada se rompió, solo se mejoró.

## 2. Tecnología utilizada

HTML5, CSS3 y JavaScript "vanilla" (sin frameworks, sin bundler, sin dependencias externas), para que el sitio siga funcionando abriendo directamente `index.html`, sin instalar Node.js ni Python.

## 3. Archivos nuevos y modificados

```
PIPOPESHOP/                              (nombre real de la carpeta del proyecto — el nombre comercial "PIPOPSHOP" no lleva la E)
├── index.html                          # Nav con Mayoreo, sección Mayoreo, carrito con botón WhatsApp
├── README.md
├── css/
│   └── styles.css                      # Ampliado: tokens, animaciones, rediseño de todas las secciones
├── js/
│   ├── data/
│   │   ├── products.js                 # ⭐ Catálogo (sin cambios de estructura)
│   │   ├── wholesale.js                # ⭐ NUEVO — reglas y precios de mayoreo + mini-FAQ
│   │   └── futureIntegrations.js       # WhatsApp ahora activo; resto sigue desactivado
│   ├── cart.js                         # Sin cambios (misma lógica y forma de datos)
│   ├── render.js                       # + renderWholesale(), FAQ reutilizable, tarjetas rediseñadas
│   ├── main.js                         # + animaciones, mensajes de WhatsApp, sombra de header, Instagram
│   └── legal.js                        # ⭐ NUEVO — activa WhatsApp/Instagram en el footer de las páginas legales
├── legal/                              # ⭐ NUEVO — páginas legales (ver sección 14)
│   ├── aviso-privacidad.html
│   ├── terminos-condiciones.html
│   ├── politica-envios.html
│   ├── cambios-devoluciones.html
│   └── politica-cookies.html
└── assets/
    ├── logo/logo-placeholder.svg
    ├── social/instagram-qr.png
    └── products/
        ├── hero-placeholder.svg
        └── colors/                     # 10 fotografías reales (compartidas por ambos productos)
```

## 4. Dónde están los datos de los productos

Sigue igual: **[`js/data/products.js`](js/data/products.js)** — precios, `PIPOPE_COLORS`, imágenes, descripciones, features. Nada de esto cambió de estructura en el rediseño.

## 5. Dónde modificar precios

- **Precios de venta individual (retail)**: `js/data/products.js` → propiedad `price` de cada producto. Hoy: 24 oz en promoción a $500 (antes $620), 32 oz en promoción a $550 (antes $670), ambas "Válidas durante todo 2026".
- **Precios de mayoreo**: **[`js/data/wholesale.js`](js/data/wholesale.js)** → arreglo `PIPOPE_WHOLESALE_TIERS`. Ahí también están las reglas (`PIPOPE_WHOLESALE_RULES`): mínimo 5 piezas, combinables, precio automático desde la pieza 5, cotización personalizada arriba del mínimo.

## 6. Dónde modificar colores

- **Colores de producto**: arreglo `PIPOPE_COLORS` en `js/data/products.js`.
- **Colores/paleta visual del sitio**: bloque `:root` en `css/styles.css` (coral, menta, ink, etc. — ahora con más variables: espaciados `--space-*`, sombras `--shadow-*`, tiempos `--duration-*`).

## 7. Dónde colocar fotografías reales

Igual que antes: `assets/products/colors/` para las fotos de color (usadas por ambos termos). La carpeta original `FOTOS CATALOGO-OWALAS/` se mantiene intacta como respaldo.

**Nota sobre 20 oz, 40 oz y modelo Tumbler**: por instrucción explícita, estos NO se agregaron como tarjetas de producto todavía (no hay fotos propias). Sí aparecen en la tabla de precios de Mayoreo con la etiqueta "Disponible por pedido", porque son datos de precio reales que sí nos diste. Cuando tengas sus fotos, se agregan como productos nuevos en `products.js` siguiendo el mismo patrón que 24 oz/32 oz — no hace falta rediseñar nada.

## 8. Cómo funciona el carrito (actualizado)

- Misma lógica de siempre en `js/cart.js` (localStorage, clave `pipope_cart_v1`) — **100% retrocompatible**: un carrito guardado en la versión anterior se sigue leyendo igual.
- Ahora, además de "Finalizar compra (próximamente)" (que sigue deshabilitado — no hay cobro real todavía), hay un botón **"Enviar pedido por WhatsApp"** que arma un mensaje así:

  ```
  Hola PIPOPSHOP 👋 Quiero hacer este pedido:

  • Termo PIPOPSHOP 24 oz — Naranja — x2 — $500.00 c/u = $1,000.00
  • Termo PIPOPSHOP 32 oz — Verde — x1 — $550.00 c/u = $550.00

  Subtotal: $1,550.00
  Total: $1,550.00

  ¿Me confirman disponibilidad y cómo continuar? ¡Gracias!
  ```

  y abre WhatsApp con ese texto ya escrito. La lógica está en `buildOrderWhatsAppMessage()` dentro de `js/main.js`.

## 9. WhatsApp — cómo está configurado

Todo vive en **[`js/data/futureIntegrations.js`](js/data/futureIntegrations.js)**, bloque `whatsapp`:

```js
whatsapp: {
  enabled: true,
  phoneNumber: "522227821556", // +52 222 782 1556
  defaultMessage: "..."
}
```

Con esto activo se encienden automáticamente: el botón flotante, el botón del carrito, el botón de cotización de Mayoreo y el enlace del footer. Si en algún momento necesitas cambiar el número o desactivarlo temporalmente, este es el único lugar que hay que tocar.

## 10. Qué información sigue pendiente de confirmar

Sin cambios respecto a la regla de veracidad del proyecto — sigue sin inventarse nada:

- Material exacto del termo, tecnología de aislamiento, horas de conservación de frío/calor.
- Dimensiones y peso exactos.
- Stock real por color.
- Garantía (más allá del derecho de cancelación legal ya documentado en la Política de Cambios y Devoluciones).
- Domicilio completo del negocio (calle, número, colonia, código postal) — ver sección 14.
- Paqueterías y tiempos de entrega — ver sección 14.
- Si las unidades son o no originales de la marca Owala — el sitio aclara que **PIPOPSHOP no es una tienda oficial de Owala**.

Las reglas y precios de **Mayoreo sí están confirmados** (los diste directamente): mínimo 5 piezas combinables, precio automático desde la pieza 5, y la tabla de precios por modelo en `js/data/wholesale.js`.

## 11. Qué queda preparado para versiones futuras

Sigue centralizado en `js/data/futureIntegrations.js` (WhatsApp ya activo; el resto sigue apagado hasta que definas los datos):

- Instagram ya está **activo** (ícono en el header, footer y sección "Síguenos en Instagram" con QR verificado — apunta a `https://www.instagram.com/pipop_shope/`). Pendientes: TikTok, Facebook.
- Formulario de contacto y dirección física.
- Checkout real con Mercado Pago, PayPal y Stripe.
- Logo definitivo (hoy sigue siendo un placeholder de texto).
- Productos 20 oz, 40 oz y Tumbler como fichas propias en la tienda (ver punto 7).

## 12. Cómo iniciar la página

Sin instalación: doble clic en `index.html`, o ábrelo desde tu navegador con:

```
file:///C:/Users/emili/OneDrive/Escritorio/PIPOPESHOP/index.html
```

## 13. Dirección local para visualizar el sitio ahora

```
C:\Users\emili\OneDrive\Escritorio\PIPOPESHOP\index.html
```

## 14. Páginas legales

Se agregaron 5 páginas legales independientes en **[`legal/`](legal/)**, enlazadas desde una nueva columna "Información legal" en el footer de todo el sitio:

- [`legal/aviso-privacidad.html`](legal/aviso-privacidad.html) — Aviso de Privacidad (LFPDPPP).
- [`legal/terminos-condiciones.html`](legal/terminos-condiciones.html) — Términos y Condiciones.
- [`legal/politica-envios.html`](legal/politica-envios.html) — Política de Envíos.
- [`legal/cambios-devoluciones.html`](legal/cambios-devoluciones.html) — Cambios y Devoluciones.
- [`legal/politica-cookies.html`](legal/politica-cookies.html) — Política de Cookies.

Cada página reutiliza `css/styles.css` y el mismo footer real del sitio (con enlaces relativos `../`), pero **no** carga el carrito ni el catálogo — no lo necesitan. Solo cargan `js/data/futureIntegrations.js` + el nuevo `js/legal.js` (más pequeño) para que los enlaces de WhatsApp/Instagram del footer funcionen igual que en `index.html`.

**Importante — conflicto legal detectado y resuelto:** pediste una política de "sin cambios ni devoluciones", pero la Ley Federal de Protección al Consumidor (artículo 56) obliga a dar a los consumidores un derecho de cancelación de 5 días hábiles en compras en línea — PROFECO lo confirma públicamente. No implementé la política "sin devoluciones" tal cual; `legal/cambios-devoluciones.html` incluye ese derecho obligatorio y aplica "sin cambios adicionales" solo para lo que excede ese mínimo legal. Detalle completo, con las fuentes citadas, en esa misma página.

**Pendiente de completar** (marcado explícitamente dentro de cada página, no inventado):
- Domicilio completo del responsable (calle, número, colonia, código postal) — requerido por la LFPDPPP para el Aviso de Privacidad.
- Paquetería(s) que se usarán para los envíos.
- Tiempos de entrega (dependen de la paquetería, todavía sin definir).
- Procedimiento para productos incorrectos, dañados o defectuosos (plazo de reporte, quién cubre el envío de devolución, reposición vs. reembolso).
- Datos de facturación electrónica (CFDI/RFC), si aplicará.

La FAQ existente (`FAQ_ITEMS` en `js/render.js`) se amplió (no se duplicó) con preguntas sobre pagos, envíos, mayoreo y cambios/devoluciones, enlazando a estas páginas.

---

**Verificación realizada:** probado en navegador en móvil (~430px), tablet y desktop (1280px). Se revisaron: animaciones de aparición al hacer scroll, sombra del header, tarjetas de producto (ficha técnica plegable, cambio de color con transición), sección Mayoreo (tabla en desktop / tarjetas en móvil, botón de cotización con mensaje correcto), carrito (agregar/quitar/incrementar, botón de WhatsApp con mensaje formateado correctamente, botón de checkout sigue deshabilitado), menú móvil, acordeones de FAQ (general y de mayoreo), y persistencia de carrito en `localStorage` — todo funcionando sin errores en consola y sin romper nada de la versión anterior.
