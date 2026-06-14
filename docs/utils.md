# Carpeta utils

## Objetivo
Contiene funciones auxiliares reutilizables para tareas específicas.

## Archivo principal

- [src/utils/googleMapsUtils.ts](../src/utils/googleMapsUtils.ts)

### Qué hace
- abre Google Maps con la ubicación del parking
- calcula la distancia entre dos puntos geográficos
- genera parkings mock para pruebas
- filtra parkings cercanos según el vehículo del usuario

### Por qué es útil
- separa la lógica geográfica de las pantallas
- hace que el código principal sea más limpio y mantenible
