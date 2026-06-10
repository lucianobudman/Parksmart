export interface User {
  uid: string;
  email: string;
  vehicleType?: 'auto' | 'moto' | 'camioneta';
  needsVehicleSelection?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setVehicleType: (type: 'auto' | 'moto' | 'camioneta') => void;
}

