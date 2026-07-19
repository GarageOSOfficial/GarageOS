export interface Vehicle {
  id: string;
  garage_id: string | null;
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  nickname: string | null;
  vin: string | null;
  color: string | null;
  mileage: number | null;
  engine: string | null;
  transmission: string | null;
  notes: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface VehicleUpdateInput {
  year: string;
  make: string;
  model: string;
  trim: string;
  vin: string;
  color: string;
  mileage: string;
  engine: string;
  transmission: string;
  notes: string;
}