import { supabase } from '@/services/auth';
import { Activity, ActivityDocumentationHooks, ActivityInput } from '@/types';

const ACTIVITIES_TABLE = 'activities';

const ACTIVITY_COLUMNS =
  'id, vehicle_id, user_id, activity_type, title, description, activity_date, created_at, updated_at, photos, attachments, metadata';

function toActivityPayload(payload: ActivityInput) {
  return {
    activity_type: payload.activity_type,
    title: payload.title.trim(),
    description: payload.description.trim() || null,
    activity_date: payload.activity_date,
    photos: payload.photos,
    attachments: payload.attachments,
    metadata: payload.metadata,
  };
}

export async function listVehicleActivities(userId: string, vehicleId: string) {
  const { data, error } = await supabase
    .from(ACTIVITIES_TABLE)
    .select(ACTIVITY_COLUMNS)
    .eq('user_id', userId)
    .eq('vehicle_id', vehicleId)
    .order('activity_date', { ascending: false })
    .order('created_at', { ascending: false });

  return {
    data: (data as Activity[] | null) ?? [],
    error,
  };
}

export async function getVehicleActivity(userId: string, vehicleId: string, activityId: string) {
  const { data, error } = await supabase
    .from(ACTIVITIES_TABLE)
    .select(ACTIVITY_COLUMNS)
    .eq('id', activityId)
    .eq('vehicle_id', vehicleId)
    .eq('user_id', userId)
    .single();

  return {
    data: (data as Activity | null) ?? null,
    error,
  };
}

export async function createVehicleActivity(userId: string, vehicleId: string, payload: ActivityInput) {
  const { data, error } = await supabase
    .from(ACTIVITIES_TABLE)
    .insert({
      vehicle_id: vehicleId,
      user_id: userId,
      ...toActivityPayload(payload),
    })
    .select(ACTIVITY_COLUMNS)
    .single();

  return {
    data: (data as Activity | null) ?? null,
    error,
  };
}

export async function updateVehicleActivity(
  userId: string,
  vehicleId: string,
  activityId: string,
  payload: ActivityInput
) {
  const { data, error } = await supabase
    .from(ACTIVITIES_TABLE)
    .update({
      ...toActivityPayload(payload),
      updated_at: new Date().toISOString(),
    })
    .eq('id', activityId)
    .eq('vehicle_id', vehicleId)
    .eq('user_id', userId)
    .select(ACTIVITY_COLUMNS)
    .single();

  return {
    data: (data as Activity | null) ?? null,
    error,
  };
}

export async function deleteVehicleActivity(userId: string, vehicleId: string, activityId: string) {
  const { error } = await supabase
    .from(ACTIVITIES_TABLE)
    .delete()
    .eq('id', activityId)
    .eq('vehicle_id', vehicleId)
    .eq('user_id', userId);

  return { error };
}

export function buildActivityDocumentationHooks(activities: Activity[]): ActivityDocumentationHooks {
  const withPhotos = activities.filter((item) => item.photos.length > 0).length;
  const withAttachments = activities.filter((item) => item.attachments.length > 0).length;

  return {
    totalActivities: activities.length,
    activitiesWithPhotos: withPhotos,
    activitiesWithAttachments: withAttachments,
    lastActivityDate: activities[0]?.activity_date ?? null,
  };
}
