# Configuración

## Objetivo
Esta carpeta contiene la inicialización de Firebase y la configuración base para la app.

## Archivo principal

- [src/config/firebase.ts](../src/config/firebase.ts)

## Qué hace este archivo

- crea la instancia de la app con `initializeApp(...)`
- expone `auth` para manejar el login, registro y logout
- expone `db` para trabajar con Firestore
- guarda la configuración del proyecto Firebase necesaria para conectar la aplicación

## Aspectos importantes

- el archivo debe apuntar al proyecto correcto de Firebase
- si cambias de proyecto o de cuenta, debes actualizar las credenciales aquí
- la autenticación y el almacenamiento de favoritos dependen directamente de esta configuración
