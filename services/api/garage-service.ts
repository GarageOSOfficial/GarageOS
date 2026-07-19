import { supabase } from '@/services/auth';
import { Garage, GarageInput, GarageVehicle, Vehicle, VehicleUpdateInput } from '@/types';

const GARAGES_TABLE = 'garages';
const VEHICLES_TABLE = 'vehicles';

const GARAGE_COLUMNS = 'id, name, description, created_at, updated_at';
const GARAGE_VEHICLE_COLUMNS = 'id, make, model, year, trim, nickname, mileage, image_url';
const VEHICLE_COLUMNS =
  'id, garage_id, year, make, model, trim, nickname, vin, color, mileage, engine, transmission, notes, image_url, created_at, updated_at';

function toGarageInput(payload: GarageInput) {
  return {
    name: payload.name.trim(),
    description: payload.description.trim() || null,
  };
}

function toVehicleUpdateInput(payload: VehicleUpdateInput) {
  const normalizedYear = Number.parseInt(payload.year.trim(), 10);
  const normalizedMileage = Number.parseInt(payload.mileage.trim(), 10);

  return {
    year: Number.isFinite(normalizedYear) ? normalizedYear : null,
    make: payload.make.trim() || null,
    model: payload.model.trim() || null,
    trim: payload.trim.trim() || null,
    vin: payload.vin.trim() || null,
    color: payload.color.trim() || null,
    mileage: Number.isFinite(normalizedMileage) ? normalizedMileage : null,
    engine: payload.engine.trim() || null,
    transmission: payload.transmission.trim() || null,
    notes: payload.notes.trim() || null,
    updated_at: new Date().toISOString(),
  };
}

export async function listUserGarages(userId: string) {
  const { data, error } = await supabase
    .from(GARAGES_TABLE)
    .select(GARAGE_COLUMNS)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return {
    data: (data as Garage[] | null) ?? [],
    error,
  };
}

export async function createUserGarage(userId: string, payload: GarageInput) {
  const { data, error } = await supabase
    .from(GARAGES_TABLE)
    .insert({
      user_id: userId,
      ...toGarageInput(payload),
    })
    .select(GARAGE_COLUMNS)
    .single();

  return {
    data: (data as Garage | null) ?? null,
    error,
  };
}

export async function updateUserGarage(userId: string, garageId: string, payload: GarageInput) {
  const { data, error } = await supabase
    .from(GARAGES_TABLE)
    .update({
      ...toGarageInput(payload),
      updated_at: new Date().toISOString(),
    })
    .eq('id', garageId)
    .eq('user_id', userId)
    .select(GARAGE_COLUMNS)
    .single();

  return {
    data: (data as Garage | null) ?? null,
    error,
  };
}

export async function deleteUserGarage(userId: string, garageId: string) {
  const { error } = await supabase
    .from(GARAGES_TABLE)
    .delete()
    .eq('id', garageId)
    .eq('user_id', userId);

  return { error };
}

export async function listGarageVehicles(userId: string, garageId: string) {
  const { data, error } = await supabase
    .from(VEHICLES_TABLE)
    .select(GARAGE_VEHICLE_COLUMNS)
    .eq('user_id', userId)
    .eq('garage_id', garageId)
    .order('created_at', { ascending: false });

  return {
    data: (data as GarageVehicle[] | null) ?? [],
    error,
  };
}

export async function getUserVehicle(userId: string, vehicleId: string) {
  const { data, error } = await supabase
    .from(VEHICLES_TABLE)
    .select(VEHICLE_COLUMNS)
    .eq('id', vehicleId)
    .eq('user_id', userId)
    .single();

  return {
    data: (data as Vehicle | null) ?? null,
    error,
  };
}

export async function updateUserVehicle(userId: string, vehicleId: string, payload: VehicleUpdateInput) {
  const { data, error } = await supabase
    .from(VEHICLES_TABLE)
    .update(toVehicleUpdateInput(payload))
    .eq('id', vehicleId)
    .eq('user_id', userId)
    .select(VEHICLE_COLUMNS)
    .single();

  return {
    data: (data as Vehicle | null) ?? null,
    error,
  };
}
