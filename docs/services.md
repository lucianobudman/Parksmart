# Servicios

## Objetivo
Esta carpeta encapsula la lógica de acceso a datos y operaciones con Firestore.

## Archivos principales

- [src/services/parkingService.ts](../src/services/parkingService.ts)
- [src/services/favoritesService.ts](../src/services/favoritesService.ts)

## parkingService

- consulta la colección `parkings`
- devuelve la lista de parkings disponibles
- permite crear un nuevo parking con `createParking(...)`
- guarda la fecha de creación usando `serverTimestamp()`

## favoritesService

- lee los favoritos del usuario desde la subcolección `users/{uid}/favorites`
- agrega o elimina un parking con `toggleFavoriteParking(...)`
- elimina un favorito específico con `removeFavoriteParking(...)`

## Cómo se usan

- `HomeScreen` usa `parkingService` para listar los lugares disponibles.
- `FavoritesScreen` usa `favoritesService` para mostrar y administrar la lista del usuario.
