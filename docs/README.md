# Documentación del proyecto ParkSmart

Esta carpeta reúne una explicación breve pero útil de cada parte del proyecto para que sea más fácil entender cómo funciona la app.

## Índice de documentación

- [config](config.md)
- [context](context.md)
- [hooks](hooks.md)
- [navigation](navigation.md)
- [screens](screens.md)
- [services](services.md)
- [styles](styles.md)
- [types](types.md)
- [utils](utils.md)

## Resumen general

ParkSmart es una app móvil hecha con React Native + Expo que permite:

- iniciar sesión y registrarse con Firebase
- ver parkings cercanos
- filtrar según el tipo de vehículo
- abrir ubicaciones en Google Maps
- guardar favoritos por usuario
- navegar entre pantallas y pestañas

## Flujo general de la app

1. El usuario entra por la pantalla de autenticación.
2. Si está logueado, la app decide si necesita elegir vehículo o si puede entrar a la pantalla principal.
3. En Home se cargan los parkings y la ubicación.
4. El usuario puede marcar favoritos y verlos en una pestaña separada.
5. Los datos de autenticación y favoritos se guardan en Firebase.
