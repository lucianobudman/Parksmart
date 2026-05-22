export type Parking = {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    fee?: string;
    parking?: string;
  };
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};