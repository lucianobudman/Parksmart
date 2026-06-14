# Carpeta context

## Objetivo
Administra el estado global de autenticación del usuario.

## Archivo principal

- [src/context/AuthContext.tsx](../src/context/AuthContext.tsx)

### Qué hace
- guarda si el usuario está logueado o no
- mantiene el estado de carga inicial
- expone funciones de login, registro, logout y selección de vehículo
- guarda el rol del usuario (`admin` o `user`)

### Flujo de uso
- la app consume este contexto desde varias pantallas
- si el usuario no está autenticado, se muestra la navegación de auth
- si ya eligió vehículo, entra directamente a la app principal
