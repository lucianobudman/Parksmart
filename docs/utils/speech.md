# simulation

# 📌 ¿Qué hace este archivo?

Este archivo controla la simulación de movimiento GPS dentro de la aplicación.

Sirve para:

- probar navegación sin moverse
- simular conducción
- mover el auto automáticamente
- probar instrucciones GPS
- desarrollar sin salir a la calle

Es MUY útil durante el desarrollo.

---

# 📁 Ubicación

```txt
src/utils/simulation.ts
```

---

# 🧠 Código completo

```tsx
export function simulateMovement(
  routeCoords: any[],
  updateLocation: Function
) {

  let index = 0;

  const interval = setInterval(() => {

    if (
      index >= routeCoords.length
    ) {

      clearInterval(interval);

      return;
    }

    updateLocation(
      routeCoords[index]
    );

    index++;

  }, 2000);

  return interval;
}
```

---

# 🧠 Explicación COMPLETA

# 📦 export function

```tsx
export function
```

---

## ¿Qué hace?

Exporta una función.

Permite usarla desde otros archivos.

---

# 🚗 simulateMovement()

```tsx
simulateMovement()
```

---

## ¿Qué hace?

Simula movimiento GPS.

---

# 🛣️ routeCoords

```tsx
routeCoords: any[]
```

---

## ¿Qué representa?

Lista de coordenadas de la ruta.

---

# 📌 Ejemplo

```tsx
[
 {
  latitude: -34.60,
  longitude: -58.38
 },

 {
  latitude: -34.61,
  longitude: -58.39
 }
]
```

---

# 🔄 updateLocation

```tsx
updateLocation: Function
```

---

## ¿Qué representa?

Función que actualiza la ubicación.

---

# 🔢 let index

```tsx
let index = 0
```

---

## ¿Qué hace?

Guarda posición actual de la simulación.

---

# 🔄 setInterval()

```tsx
setInterval()
```

---

## ¿Qué hace?

Ejecuta código repetidamente.

---

# ⏱️ 2000

```tsx
2000
```

---

## ¿Qué significa?

2 segundos.

---

# ❓ if()

```tsx
if (
 index >= routeCoords.length
)
```

---

## ¿Qué hace?

Verifica si terminó la ruta.

---

# 🛑 clearInterval()

```tsx
clearInterval(interval)
```

---

## ¿Qué hace?

Detiene simulación.

---

# 📍 updateLocation()

```tsx
updateLocation(
 routeCoords[index]
)
```

---

## ¿Qué hace?

Mueve ubicación del usuario.

---

# ➕

```tsx
index++
```

---

## ¿Qué hace?

Avanza al siguiente punto.

---

# 📤 return interval

```tsx
return interval
```

---

## ¿Qué hace?

Devuelve el intervalo creado.

---

# 📌 ¿Para qué sirve esto?

Permite probar:

```txt
✅ navegación
✅ voz
✅ rutas
✅ animaciones
✅ cámara
✅ instrucciones
```

SIN moverse físicamente.

---

# 📌 ¿Cómo funciona?

La simulación:

```txt
toma coordenadas de la ruta
↓
las recorre una por una
↓
actualiza GPS falso
↓
la app cree que el usuario se mueve
```

---

# 📌 ¿Dónde se usa?

Normalmente en:

```txt
✅ HomeScreen
✅ modo developer
✅ testing GPS
```

---

# 🔄 Flujo completo

```txt
Usuario inicia simulación
↓
simulateMovement()
↓
setInterval comienza
↓
Cada 2 segundos:
↓
Nueva coordenada se aplica
↓
Mapa mueve auto
↓
GPS cambia
↓
Navegación avanza
↓
Voz habla instrucciones
```

---

# 📌 ¿Por qué esto es MUY importante?

Porque desarrollar navegación GPS real es difícil.

La simulación permite:

```txt
✅ desarrollar desde casa
✅ probar rápido
✅ evitar manejar
✅ debuggear navegación
```

---

# 📌 Apps reales también hacen esto

Lo usan:

```txt
✅ Google Maps
✅ Waze
✅ Uber
✅ apps GPS profesionales
```

durante desarrollo.

---

# 📌 ¿Por qué separar simulation en utils?

Porque es:

```txt
una función reutilizable
```

y NO:

```txt
❌ UI
❌ pantalla
❌ componente
```

---

# 📌 Beneficios

```txt
✅ código limpio
✅ modular
✅ reutilizable
✅ testing fácil
```

---

# 📌 Arquitectura correcta

```txt
screens
↓
utils
↓
helpers de simulación
```