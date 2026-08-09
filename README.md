# PIPOPE SHOPE — Sitio web (v1)

Primera versión funcional de la tienda en línea de **PIPOPE SHOPE**: termos estilo Owala en 24 oz y 32 oz, para el mercado mexicano (MXN).

---

## 1. Qué se construyó

- Landing page completa: Header con navegación, Hero, catálogo de Productos (24 oz y 32 oz), sección de Características (comparativa + puntos de marca), FAQ, Carrito funcional y Footer.
- Catálogo de productos **centralizado en un solo archivo**, fácil de editar sin tocar HTML/CSS.
- Carrito de compras 100% frontend con persistencia en `localStorage` (no procesa pagos todavía).
- Diseño **mobile-first**, probado en tamaños móvil, tablet y desktop.
- Arquitectura preparada (pero desactivada) para integrar en el futuro: WhatsApp, Instagram, TikTok, Facebook, formulario de contacto, dirección física, Mercado Pago, PayPal y Stripe.
- **Ningún dato técnico, de precio, color o política comercial fue inventado.** Todo lo que no pudo verificarse en donmayoreo.com se muestra explícitamente como "Por confirmar" / "Próximamente".

## 2. Tecnología utilizada

HTML5, CSS3 y JavaScript "vanilla" (sin frameworks, sin bundler, sin dependencias externas). Se eligió deliberadamente este enfoque para que el sitio funcione abriendo directamente el archivo `index.html`, sin necesidad de instalar Node.js, Python ni ninguna otra herramienta (verifiqué que este equipo no las tiene instaladas).

## 3. Archivos creados

```
PIPOPESHOP/
├── index.html                          # Estructura de toda la página
├── README.md                           # Este documento
├── css/
│   └── styles.css                      # Todos los estilos (mobile-first)
├── js/
│   ├── data/
│   │   ├── products.js                 # ⭐ CATÁLOGO — editar precios/colores/stock/imágenes aquí
│   │   └── futureIntegrations.js       # ⭐ Config. de WhatsApp/redes/pagos (desactivada por ahora)
│   ├── cart.js                         # Lógica del carrito (localStorage)
│   ├── render.js                       # Pinta productos, FAQ y carrito en pantalla
│   └── main.js                         # Inicializa el sitio y conecta los eventos (menú, carrito, FAQ)
└── assets/
    ├── logo/
    │   └── logo-placeholder.svg        # Logo provisional (texto "PIPOPE SHOPE")
    └── products/
        ├── hero-placeholder.svg        # Imagen provisional del hero
        ├── termo-24oz/
        │   └── placeholder-1.svg       # Imagen provisional del termo 24 oz
        └── termo-32oz/
            └── placeholder-1.svg       # Imagen provisional del termo 32 oz
```

No se modificó ningún archivo existente porque el proyecto se creó desde cero en esta carpeta.

## 4. Dónde están los datos de los productos

Todo el catálogo vive en **[`js/data/products.js`](js/data/products.js)**. Es el único archivo que necesitas tocar para:

- Cambiar **precios** → propiedad `price` de cada producto (actualmente `349` y `399`, marcados como `priceIsPlaceholder: true` y mostrados en pantalla con la etiqueta "PRECIO TEMPORAL"). Cuando definas tus precios reales, actualiza `price` y pon `priceIsPlaceholder: false`.
- Configurar **promociones/descuentos** → propiedad `compareAtPrice` (precio tachado). Déjalo en `null` si no hay promoción.
- Agregar **colores/variantes** → arreglo `colors` (hoy vacío, `colorsStatus: "pending"` porque el proveedor no tiene colores confirmados). Ejemplo de cómo agregar uno lo encontrarás comentado en el propio archivo.
- Definir **stock** → propiedad `stock` y `stockStatus`.
- Reemplazar **fotografías** → arreglo `images`, apuntando a tus archivos dentro de `assets/products/`.
- Editar **descripciones y características** → propiedades `description` y `features`.
- Agregar **nuevos productos** (ej. un tercer tamaño en el futuro) → agrega un nuevo objeto al arreglo `PIPOPE_PRODUCTS` siguiendo la misma estructura; el catálogo, las tarjetas y el carrito se actualizan automáticamente, sin tocar HTML.

## 5. Dónde modificar precios

`js/data/products.js` → propiedad `price` de cada producto (ver punto 4). No hay precios en ningún otro archivo.

## 6. Dónde modificar colores

- **Colores/variantes de producto** (para venta): arreglo `colors` en `js/data/products.js`.
- **Colores de marca / paleta visual del sitio** (fondo, acentos, botones): variables CSS al inicio de `css/styles.css` (bloque `:root`, por ejemplo `--color-coral`, `--color-mint`, `--color-ink`). Cambiar esas variables actualiza el color en todo el sitio de forma consistente.

## 7. Dónde colocar las fotografías reales

- Termo 24 oz → `assets/products/termo-24oz/` (reemplaza o agrega junto a `placeholder-1.svg` y actualiza la ruta en `images` dentro de `products.js`).
- Termo 32 oz → `assets/products/termo-32oz/`.
- Imagen del Hero → `assets/products/hero-placeholder.svg` (o agrega una nueva y actualiza la referencia en `index.html`).
- Logo definitivo → `assets/logo/` (actualiza la ruta en `index.html`, hay dos referencias: header y footer).

Todas las imágenes actuales son **ilustraciones propias tipo placeholder** (SVG originales creados para este proyecto), no fotografías de Owala ni de donmayoreo.com, para no usar contenido cuyo derecho de uso no está confirmado.

## 8. Cómo funciona el carrito

- Implementado en `js/cart.js`, usando `localStorage` (clave `pipope_cart_v1`) para que el carrito **se mantenga aunque el usuario navegue o cierre y reabra el navegador**.
- Permite: agregar producto, agregar varias unidades, ver artículos agregados, cambiar cantidades (+/-), eliminar productos, y calcula subtotal y total automáticamente.
- El ícono de carrito en el header muestra el número de unidades y abre un panel lateral (drawer) con el detalle.
- **No procesa pagos ni cobros reales todavía** — el botón "Finalizar compra" está deshabilitado intencionalmente hasta integrar una pasarela de pago real (ver punto 10).
- Probado end-to-end en el navegador: agregar, incrementar, eliminar y persistencia tras recargar la página — todo funcionando correctamente.

## 9. Qué información sigue pendiente de confirmar

Por la regla de veracidad del proyecto, **no se inventó ningún dato**. Lo que investigué en donmayoreo.com y owalalife.com me permitió confirmar únicamente:

- Que existen termos "estilo Owala" de 24 oz y 32 oz comercializados por proveedores mayoristas en México (referencia: donmayoreo.com).
- La conversión matemática aproximada oz → ml (24 oz ≈ 710 ml, 32 oz ≈ 946 ml).

**No pude confirmar** (por lo tanto NO están en el sitio como datos definitivos, sino marcados como "Por confirmar" / "Próximamente"):

- Material exacto del termo.
- Tecnología de aislamiento y horas de conservación de frío/calor.
- Dimensiones y peso exactos.
- Colores/variantes reales disponibles para venta individual.
- Stock real.
- Garantía.
- Políticas de envío (tiempos y costos).
- Políticas de devolución.
- Precios de venta definitivos (los actuales son temporales).
- Si las unidades son o no originales de la marca Owala (donmayoreo.com las cataloga como "Calidad Media", sin especificar fabricante) — por eso el sitio aclara explícitamente que **PIPOPE SHOPE no es una tienda oficial de Owala**.

En cuanto tengas esta información confirmada con tu proveedor, se actualiza directamente en `js/data/products.js`.

## 10. Qué funciones están preparadas para versiones futuras

Toda la arquitectura ya tiene "ganchos" listos, desactivados hasta que definas la información real. Todo centralizado en **[`js/data/futureIntegrations.js`](js/data/futureIntegrations.js)**:

- Botón flotante de WhatsApp (estructura ya en `index.html`, oculta hasta activarla).
- Instagram (incluida referencia a la cuenta `@pipope_shope` en un comentario, **sin mostrarla en el sitio**, tal como pediste).
- TikTok y Facebook.
- Formulario de contacto y dirección física.
- Checkout real con Mercado Pago, PayPal y Stripe.
- Reemplazo del logo provisional por el definitivo.

Para activar cualquiera de estas funciones: cambia `enabled: true` y completa los datos correspondientes en `futureIntegrations.js`; los componentes de la interfaz ya están preparados para leer de ahí (busca los comentarios `INTEGRACIÓN FUTURA` en `index.html` y `js/main.js`).

## 11. Cómo iniciar la página nuevamente

No requiere instalación ni servidor: solo abre el archivo `index.html` con doble clic, o desde tu navegador con:

```
file:///C:/Users/emili/OneDrive/Escritorio/PIPOPESHOP/index.html
```

Si en algún momento prefieres verla servida por un servidor local (por ejemplo, para evitar restricciones específicas de algún navegador), y más adelante instalas Node.js o Python, puedes usar respectivamente `npx serve .` o `python -m http.server` desde esta carpeta.

## 12. Dirección local para visualizar el sitio ahora

Ábrelo directamente en tu navegador (Chrome, Edge, Firefox) desde:

```
C:\Users\emili\OneDrive\Escritorio\PIPOPESHOP\index.html
```

---

**Verificación realizada:** el sitio fue probado en el navegador (vista móvil, tablet y desktop): scroll del botón "Ver productos", tarjetas de producto, agregar/quitar/incrementar en el carrito, persistencia del carrito al recargar, menú móvil y acordeón de FAQ — todo funcionando correctamente y sin errores en consola.
