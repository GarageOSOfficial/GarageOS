export interface Garage {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface GarageInput {
  name: string;
  description: string;
}

export interface GarageVehicle {
  id: string;
  make: string | null;
  model: string | null;
  year: number | null;
  trim: string | null;
  nickname: string | null;
  mileage: number | null;
  image_url: string | null;
}
