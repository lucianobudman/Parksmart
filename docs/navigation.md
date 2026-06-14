# Carpeta navigation

## Objetivo
Define cómo se mueve la app entre pantallas y pestañas.

## Archivos principales

- [src/navigation/AppNavigator.tsx](../src/navigation/AppNavigator.tsx)
- [src/navigation/AuthNavigator.tsx](../src/navigation/AuthNavigator.tsx)

### Qué hace AppNavigator
- decide si mostrar la pantalla de autenticación, la selección de vehículo o la app principal
- usa pestañas para navegar entre Parkings y Favoritos

### Qué hace AuthNavigator
- gestiona el flujo de login y registro
- permite pasar de una pantalla a otra sin salir de la navegación principal
