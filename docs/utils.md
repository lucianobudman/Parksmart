# Utilidades

## Objetivo
Contener funciones auxiliares reutilizables para tareas específicas de la app.

## Archivo principal

- [src/utils/googleMapsUtils.ts](../src/utils/googleMapsUtils.ts)

## Qué hace

- abre Google Maps con la latitud y longitud del parking
- calcula la distancia entre dos coordenadas usando la fórmula Haversine
- genera parkings mock para pruebas o cuando no hay datos reales
- filtra la lista según el radio y el tipo de vehículo del usuario

## Valor en el proyecto

- mantiene la lógica de mapas fuera de las pantallas
- reduce la complejidad del código principal
- permite reutilizar funciones de geolocalización y filtrado en varios puntos de la app
