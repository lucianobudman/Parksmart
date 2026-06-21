# Navegación

## Objetivo
Define la estructura de pantallas y cómo la app cambia de vista según el estado de sesión.

## Archivos principales

- [src/navigation/AppNavigator.tsx](../src/navigation/AppNavigator.tsx)
- [src/navigation/AuthNavigator.tsx](../src/navigation/AuthNavigator.tsx)

## AppNavigator

- crea el contenedor principal de navegación
- usa `NavigationContainer` para manejar el árbol de rutas
- decide si mostrar:
  - la navegación de autenticación,
  - la pantalla de selección de vehículo,
  - o la navegación principal con pestañas
- incluye la pantalla de configuración del usuario (`UserConfigScreen`)

## AuthNavigator

- maneja el flujo de acceso a la app
- conecta `LoginScreen` y `RegisterScreen`
- también permite llegar a la selección de vehículo desde el registro

## Flujo de navegación

1. si no hay usuario, la app va a AuthNavigator
2. si el usuario existe pero no eligió vehículo, se muestra VehicleSelectionScreen
3. si todo está listo, se muestran las pestañas principales
4. desde Home se puede abrir la pantalla de configuración del usuario
