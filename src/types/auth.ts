export interface User {
  uid: string;
  email: string;
  vehicleType?: 'auto' | 'moto' | 'camioneta';
  hasVehicle?: boolean;
  needsVehicleSelection?: boolean;
  role?: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setVehicleType: (type: 'auto' | 'moto' | 'camioneta') => void;
  setUserRole: (role: 'admin' | 'user') => Promise<void>;
}

