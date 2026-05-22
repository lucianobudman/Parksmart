# mapStyle

# 📌 ¿Qué hace este archivo?

Este archivo contiene TODOS los estilos visuales personalizados del mapa.

Permite cambiar:

- colores
- calles
- edificios
- agua
- parques
- etiquetas
- apariencia general del mapa

Es lo que hace que el mapa se vea más moderno y profesional.

---

# 📁 Ubicación

```txt
src/styles/mapStyle.ts
```

---

# 🧠 Código completo

```tsx
const mapStyle = [

  {
    elementType: 'geometry',

    stylers: [
      {
        color: '#1f2937',
      },
    ],
  },

  {
    elementType: 'labels.text.fill',

    stylers: [
      {
        color: '#f9fafb',
      },
    ],
  },

  {
    featureType: 'road',

    elementType: 'geometry',

    stylers: [
      {
        color: '#374151',
      },
    ],
  },

  {
    featureType: 'water',

    elementType: 'geometry',

    stylers: [
      {
        color: '#2563eb',
      },
    ],
  },

];

export default mapStyle;
```

---

# 🧠 Explicación COMPLETA

# 📦 const mapStyle

```tsx
const mapStyle = []
```

---

## ¿Qué hace?

Guarda una lista de estilos del mapa.

---

# 📦 Array []

```tsx
[]
```

---

## ¿Qué representa?

Una lista de configuraciones visuales.

---

# 📦 Object {}

```tsx
{}
```

---

## ¿Qué representa?

Una configuración individual del mapa.

---

# 🧩 elementType

```tsx
elementType
```

---

## ¿Qué hace?

Indica QUÉ parte del mapa se modifica.

---

# 🧱 geometry

```tsx
elementType: 'geometry'
```

---

## ¿Qué significa?

Modifica formas principales.

Ejemplo:

```txt
✅ calles
✅ edificios
✅ fondo
```

---

# 🏷️ labels.text.fill

```tsx
labels.text.fill
```

---

## ¿Qué hace?

Cambia color de textos.

---

# 🛣️ featureType

```tsx
featureType
```

---

## ¿Qué hace?

Selecciona categoría específica.

---

# 🛣️ road

```tsx
featureType: 'road'
```

---

## ¿Qué modifica?

Calles y rutas.

---

# 🌊 water

```tsx
featureType: 'water'
```

---

## ¿Qué modifica?

Agua.

Ejemplo:

```txt
✅ ríos
✅ lagos
✅ mar
```

---

# 🎨 stylers

```tsx
stylers: []
```

---

## ¿Qué hace?

Aplica estilos visuales.

---

# 🎨 color

```tsx
color: '#1f2937'
```

---

## ¿Qué hace?

Cambia color.

---

# 🌑 #1f2937

```txt
#1f2937
```

---

## ¿Qué color es?

Gris oscuro.

---

# ⚪ #f9fafb

```txt
#f9fafb
```

---

## ¿Qué color es?

Blanco/gris claro.

---

# 🔵 #2563eb

```txt
#2563eb
```

---

## ¿Qué color es?

Azul.

---

# 📤 export default

```tsx
export default mapStyle
```

---

## ¿Qué hace?

Permite usar estilos en otros archivos.

---

# 🗺️ Uso en HomeScreen

```tsx
<MapView
 customMapStyle={mapStyle}
/>
```

---

## ¿Qué hace?

Aplica estilo personalizado al mapa.

---

# 🔄 Flujo completo

```txt
HomeScreen carga
↓
MapView se renderiza
↓
customMapStyle recibe estilos
↓
Google Maps aplica colores
↓
Mapa aparece personalizado
```

---

# 📌 ¿Por qué usar estilos personalizados?

Porque mejora:

```txt
✅ apariencia
✅ diseño moderno
✅ branding
✅ experiencia visual
✅ legibilidad
```

---

# 📌 ¿Qué permite modificar?

```txt
✅ calles
✅ agua
✅ edificios
✅ parques
✅ textos
✅ rutas
✅ colores
✅ íconos
```

---

# 📌 ¿Por qué separar estilos?

Porque evita:

```txt
❌ código gigante en screens
```

y mejora:

```txt
✅ organización
✅ limpieza
✅ reutilización
```

---

# 📌 ¿Qué tipo de mapa usa?

React Native Maps usa:

```txt
✅ Google Maps (Android)
✅ Apple Maps (iOS)
```

---

# 📌 ¿Dónde se consiguen estilos?

Normalmente en:

```txt
https://mapstyle.withgoogle.com/
```

o:

```txt
https://snazzymaps.com/
```

---

# 📌 ¿Qué estilo usa tu app?

Tu app usa:

```txt
🌑 Dark Mode
```

para parecerse a:

```txt
✅ Google Maps Night
✅ Uber
✅ Waze
✅ Tesla Navigation
```