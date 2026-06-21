# Tipos de la app

## Objetivo
Definir contratos claros para los datos que usa la aplicación.

## Archivo principal

- [src/types/auth.ts](../src/types/auth.ts)

## Qué incluye

- la interfaz `User`, con datos como `uid`, `email`, `vehicleType`, `hasVehicle`, `needsVehicleSelection` y `role`
- la interfaz `AuthContextType`, que describe las funciones disponibles para manejar la sesión

## Por qué es útil

- permite que TypeScript detecte errores al usar el contexto
- deja explícito qué información debe estar disponible en la app
- facilita el mantenimiento del código en el tiempo
