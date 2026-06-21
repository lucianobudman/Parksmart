# Documentación de ParkSmart

Esta carpeta reúne la explicación de cada parte del proyecto para que sea más fácil entender cómo está organizada la app y qué hace cada módulo.

## Índice rápido

- [config](config.md): configuración inicial de Firebase.
- [context](context.md): estado global de autenticación.
- [hooks](hooks.md): lógica reutilizable para ubicación.
- [navigation](navigation.md): navegación principal y flujo de pantallas.
- [screens](screens.md): pantallas visibles para el usuario.
- [services](services.md): acceso a datos y operaciones con Firestore.
- [styles](styles.md): estilos compartidos de la interfaz.
- [types](types.md): tipos y contratos de TypeScript.
- [utils](utils.md): utilidades de mapas y distancia.

## Cómo leer esta documentación

- Si quieres entender el arranque de la app, revisa la sección de [config](config.md) y [navigation](navigation.md).
- Si buscas la lógica de sesión, mira [context](context.md) y [types](types.md).
- Si quieres revisar la interfaz, empieza por [screens](screens.md) y [styles](styles.md).
- Si te interesa la conexión con Firebase, revisa [services](services.md).

## Visión general del proyecto

ParkSmart usa React Native + Expo para mostrar parkings cercanos, calcular distancias con la ubicación del usuario y permitir interacción con favoritos y mapas. La arquitectura está separada en:

- pantallas para la experiencia del usuario,
- servicios para acceder a Firebase,
- utilidades para datos geográficos,
- un contexto global para manejar la sesión.

## Flujo resumido

1. El usuario abre la app.
2. El sistema revisa si hay sesión activa.
3. Si no eligió vehículo todavía, se le solicita hacerlo.
4. Luego entra al flujo principal con las pestañas de Parkings y Favoritos.
5. La app muestra parkings según proximidad, tipo de vehículo y radio configurado.
6. El usuario puede guardar favoritos, abrir Google Maps o cambiar su contraseña desde configuración.
