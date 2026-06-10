# ParkSmart - App de Parkings

Una aplicación móvil para encontrar parkings cercanos a tu ubicación y abrir rutas en Google Maps.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Setup](#setup)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación Detallada](#documentación-detallada)
- [Pantallas](#pantallas)

---

## ✨ Características

- ✅ **Autenticación**: Login y Registro con Firebase
- ✅ **Ubicación en Tiempo Real**: Obtiene la ubicación del dispositivo
- ✅ **Parkings Cercanos**: Busca parkings en un radio de 4km
- ✅ **Integración Google Maps**: Abre rutas directamente en Google Maps
- ✅ **Base de Datos**: Firebase Firestore preparada para guardar información
- ✅ **Distancias Calculadas**: Muestra la distancia a cada parking

---

## 🚀 Setup

### 1. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** (Email/Password)
3. Copia tu configuración de Firebase
4. Actualiza `src/config/firebase.ts` con tus credenciales

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar la App

```bash
npm start
# Android
npm run android
# iOS
npm run ios
# Web
npm run web
```

---

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── firebase.ts           # Configuración de Firebase
├── context/
│   └── AuthContext.tsx       # Context para autenticación
├── hooks/
│   └── useUserLocation.ts    # Hook para obtener ubicación
├── navigation/
│   ├── AppNavigator.tsx      # Navegación principal
│   └── AuthNavigator.tsx     # Navegación de autenticación
├── screens/
│   ├── LoginScreen.tsx       # Pantalla de inicio de sesión
│   ├── RegisterScreen.tsx    # Pantalla de registro
│   └── HomeScreen.tsx        # Pantalla principal (parkings)
├── styles/
│   └── global.ts             # Estilos globales
├── types/
│   └── auth.ts               # Tipos TypeScript
└── utils/
    └── googleMapsUtils.ts    # Utilidades para ubicación y mapas
```

---

## 📚 Documentación Detallada

### 1. **Firebase Configuration** (`src/config/firebase.ts`)

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAZv3aVBor2hswdML0Ghl5ht1CjqrIEaYY',
  authDomain: 'parkingsmart-2d5c0.firebaseapp.com',
  projectId: 'parkingsmart-2d5c0',
  storageBucket: 'parkingsmart-2d5c0.firebasestorage.app',
  messagingSenderId: '591985736711',
  appId: '1:591985736711:web:effbfa9929945205bffea2',
  measurementId: 'G-3956BKXZ0D',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**¿Qué hace?**
- Inicializa Firebase con tu configuración
- `auth`: Objeto para manejar autenticación (login, registro, logout)
- `db`: Base de datos Firestore para almacenar datos

---

### 2. **Authentication Context** (`src/context/AuthContext.tsx`)

```typescript
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '' });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**¿Qué hace?**
- **AuthProvider**: Envuelve toda la app para dar acceso a autenticación
- **useEffect**: Detecta automáticamente si el usuario está logueado (mantiene sesión activa)
- **login()**: Inicia sesión con email y contraseña
- **register()**: Crea cuenta nueva
- **logout()**: Cierra sesión
- **Compartir estado**: Todos los componentes pueden acceder a `user`, `loading` sin prop drilling

---

### 3. **User Location Hook** (`src/hooks/useUserLocation.ts`)

```typescript
export const useUserLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      } catch (err) {
        setError('Error al obtener ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, error, loading };
};
```

**¿Qué hace?**
- **requestForegroundPermissionsAsync()**: Pide permiso al usuario para acceder a su ubicación
- **getCurrentPositionAsync()**: Obtiene las coordenadas GPS actuales del teléfono
- **Retorna**: `location` (lat/lon), `error` (si algo falla), `loading` (mientras se obtiene)

---

### 4. **Utilities para Mapas** (`src/utils/googleMapsUtils.ts`)

```typescript
export const openGoogleMaps = (lat: number, lon: number, label: string) => {
  const url = `https://maps.google.com/?q=${lat},${lon}`;
  Linking.openURL(url);
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const filterNearbyParkings = (parkings: any[], userLat: number, userLon: number, radiusKm: number) => {
  return parkings
    .map((parking) => ({
      ...parking,
      distance: calculateDistance(userLat, userLon, parking.lat, parking.lon),
    }))
    .filter((parking) => parking.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};
```

**¿Qué hace cada función?**

1. **openGoogleMaps()**
   - Crea una URL con las coordenadas del parking
   - Abre Google Maps automáticamente en el navegador o app

2. **calculateDistance()** (Fórmula de Haversine)
   - Calcula la distancia exacta entre 2 puntos en la tierra (en km)
   - Usa trigonometría para convertir coordenadas GPS en distancia real

3. **filterNearbyParkings()**
   - Calcula distancia a cada parking
   - Filtra solo parkings dentro del radio (4km)
   - Ordena por distancia (más cercanos primero)

---

### 5. **Login Screen** (`src/screens/LoginScreen.tsx`)

```typescript
export default function LoginScreen() {
  const navigation = useNavigation() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);  // Firebase inicia sesión
      // La app automáticamente navega a HomeScreen (detectado por AppNavigator)
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**¿Qué hace?**
- Formulario para ingresar email y contraseña
- `handleLogin()`: Envía credenciales a Firebase, si es correcto → login exitoso
- Botón para ir a pantalla de Registro
- Muestra loading mientras se procesa

---

### 6. **Register Screen** (`src/screens/RegisterScreen.tsx`)

Similar a LoginScreen pero con:
- Campo adicional para confirmar contraseña
- Validación de contraseña mínimo 6 caracteres
- `register()` crea cuenta nueva en Firebase
- Botón para volver a Login

---

### 7. **Home Screen - Parkings Cercanos** (`src/screens/HomeScreen.tsx`)

```typescript
export default function HomeScreen() {
  const { location, loading: locationLoading, error: locationError } = useUserLocation();
  const allParkings = generateMockParkings();
  
  // Obtiene parkings cercanos
  const nearbyParkings = location
    ? filterNearbyParkings(allParkings, location.latitude, location.longitude, 4)
    : [];

  return (
    <ScrollView>
      {nearbyParkings.map((parking) => (
        <View key={parking.id}>
          <Text>{parking.name}</Text>
          <Text>Distancia: {parking.distance.toFixed(2)} km</Text>
          <TouchableOpacity onPress={() => openGoogleMaps(parking.lat, parking.lon, parking.name)}>
            <Text>Abrir en Google Maps</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
```

**¿Qué hace?**
1. Obtiene la ubicación del usuario con `useUserLocation()`
2. Genera lista de parkings mock
3. Filtra parkings a 4km con `filterNearbyParkings()`
4. Muestra cada parking con su distancia
5. Al presionar → abre Google Maps con coordenadas

---

### 8. **Navigation** (`src/navigation/AppNavigator.tsx`)

```typescript
export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />  // Usuario logueado
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />  // Usuario no logueado
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**¿Qué hace?**
- Verifica si hay usuario logueado
- Si `user` existe → muestra HomeScreen
- Si no → muestra pantallas de Login/Register
- Cambia automáticamente cuando el usuario se loguea/desloguea

---

### 9. **Global Styles** (`src/styles/global.ts`)

Define estilos reutilizables para toda la app:
- `container`: Padding y fondo
- `button`: Estilos de botones azules
- `input`: Campos de texto
- `card`: Contenedores blancos con sombra
- `title`: Títulos grandes

---

## 📱 Pantallas

### 1. **LoginScreen**
- Entrada de email y contraseña
- Botón "Iniciar Sesión"
- Link a "Regístrate"

### 2. **RegisterScreen**
- Email, contraseña, confirmar contraseña
- Validaciones (contraseña mínimo 6 caracteres)
- Botón "Registrarse"
- Link a "Inicia sesión"

### 3. **HomeScreen**
- Muestra email de sesión
- Botón "Salir" (logout)
- Lista de parkings cercanos
- Cada parking muestra: nombre, tarifa, distancia
- Botón "Abrir en Google Maps"

---

## 🔄 Flujo de la App

```
1. Usuario abre app
   ↓
2. AuthContext verifica si está logueado
   ├─ SÍ → Muestra HomeScreen
   └─ NO → Muestra LoginScreen
   
3. En LoginScreen:
   - Opción 1: Inicia sesión (email + pass) → HomeScreen
   - Opción 2: Va a RegisterScreen
   
4. En RegisterScreen:
   - Crea cuenta nueva → Login automático → HomeScreen
   - O vuelve a LoginScreen
   
5. En HomeScreen:
   - App obtiene ubicación GPS
   - Busca parkings dentro de 4km
   - Muestra lista ordenada por distancia
   - Usuario presiona "Abrir en Google Maps"
   - Se abre Google Maps con la ruta
```

---

## 🔐 Seguridad

- ✅ Contraseñas nunca se ven (campo `secureTextEntry`)
- ✅ Firebase maneja autenticación de forma segura
- ✅ Credenciales de Firebase en `firebase.ts`
- ✅ Permisos de ubicación solicitados al usuario

---

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| firebase | 12.13.0 | Autenticación y base de datos |
| @react-navigation | 7.2.4 | Navegación entre pantallas |
| expo-location | 19.0.8 | Obtener ubicación GPS |
| expo | 54.0.33 | Framework React Native |
| react-native | 0.81.5 | Framework móvil |

---

## 🐛 Troubleshooting

### "Permiso de ubicación denegado"
- Ve a Configuración → Apps → ParkSmart → Permisos → Ubicación → Permitir

### "No hay parkings cercanos"
- Los parkings mock están alrededor de Buenos Aires (-34.60, -58.38)
- Verifica que tu ubicación esté cerca

### "Error de Firebase"
- Revisa credenciales en `src/config/firebase.ts`
- Asegúrate que Authentication está habilitado en Firebase Console

---

## 📝 Notas

- **Parkings mock**: Actualmente usa datos ficticios. Puedes conectar una API real
- **Radio de búsqueda**: Configurable en `HomeScreen.tsx` (actualmente 4km)
- **Distancia en km**: Se calcula automáticamente según ubicación del usuario

