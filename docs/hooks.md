# Carpeta hooks

## Objetivo
Contiene lógica reutilizable para obtener datos del dispositivo.

## Archivo principal

- [src/hooks/useUserLocation.ts](../src/hooks/useUserLocation.ts)

### Qué hace
- pide permisos de ubicación si es necesario
- obtiene la ubicación actual del usuario
- devuelve el estado de carga y posibles errores

### Por qué es útil
- evita repetir la lógica de GPS en cada pantalla
- permite que HomeScreen y otras pantallas usen la misma fuente de ubicación
