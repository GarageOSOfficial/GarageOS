import { supabase } from '@/services/auth';
import { Garage, GarageInput, GarageVehicle } from '@/types';

const GARAGES_TABLE = 'garages';
const VEHICLES_TABLE = 'vehicles';

const GARAGE_COLUMNS = 'id, name, description, created_at, updated_at';
const GARAGE_VEHICLE_COLUMNS = 'id, make, year, trim, nickname, mileage';

function toGarageInput(payload: GarageInput) {
  return {
    name: payload.name.trim(),
    description: payload.description.trim() || null,
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
