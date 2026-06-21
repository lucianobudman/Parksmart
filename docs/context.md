# Contexto de autenticación

## Objetivo
Este módulo administra el estado global de sesión del usuario y expone las operaciones necesarias para interactuar con Firebase Auth.

## Archivo principal

- [src/context/AuthContext.tsx](../src/context/AuthContext.tsx)

## Qué hace

- mantiene el estado actual del usuario autenticado
- detecta si la sesión está cargando o ya terminó
- permite iniciar sesión, registrarse, cerrar sesión y cambiar contraseña
- guarda información como `vehicleType`, `hasVehicle`, `needsVehicleSelection` y `role`
- actualiza Firestore cuando el usuario selecciona su vehículo o cambia su rol

## Flujo importante

- la app usa este contexto para decidir si mostrar la navegación pública o la navegación privada
- si el usuario viene sin sesión, se muestra el flujo de login/registro
- si el usuario aún no eligió vehículo, la app lo obliga a hacerlo antes de entrar a la pantalla principal
