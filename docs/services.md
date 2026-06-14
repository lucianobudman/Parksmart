# Carpeta services

## Objetivo
Centraliza la comunicación con Firebase para operaciones de datos.

## Archivos principales

- [src/services/parkingService.ts](../src/services/parkingService.ts)
- [src/services/favoritesService.ts](../src/services/favoritesService.ts)

### parkingService
- obtiene parkings desde Firestore
- crea nuevos parkings si el usuario tiene permisos de admin

### favoritesService
- guarda favoritos en una subcolección por usuario
- permite agregar, eliminar y listar favoritos
