# Hooks

## Objetivo
Los hooks encapsulan lógica reutilizable para evitar repetir código en varias pantallas.

## Archivo principal

- [src/hooks/useUserLocation.ts](../src/hooks/useUserLocation.ts)

## Qué hace

- solicita permisos de ubicación en segundo plano del sistema
- obtiene la ubicación actual del usuario cuando es posible
- usa una ubicación de respaldo si el permiso no se concede
- devuelve tres valores: `location`, `error` y `loading`

## Importancia en la app

- permite que la pantalla principal pueda mostrar parkings cercanos sin duplicar la lógica de GPS
- si la ubicación no está disponible, la UI aún puede mostrar resultados aproximados usando datos de referencia
