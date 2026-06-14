# Carpeta config

## Objetivo
Esta carpeta contiene la configuración inicial de Firebase y los objetos que permiten conectar la app con autenticación y base de datos.

## Archivo principal

- [src/config/firebase.ts](../src/config/firebase.ts)

### Qué hace
- inicializa Firebase
- expone `auth` para login y registro
- expone `db` para leer y escribir datos en Firestore

### Importante
- aquí se colocan las credenciales del proyecto de Firebase
- si cambias de proyecto, este archivo es el primero que debes actualizar
