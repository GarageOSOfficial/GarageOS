import { supabase } from '@/services/auth';

const VEHICLE_ACTIVITY_PHOTO_BUCKET = 'vehicle-activity-photos';

function extensionFromUri(uri: string) {
  const match = uri.match(/\.([a-zA-Z0-9]+)(\?|$)/);
  return match?.[1]?.toLowerCase() ?? 'jpg';
}

export async function uploadVehicleActivityPhoto(
  userId: string,
  vehicleId: string,
  activityId: string,
  uri: string
) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const bytes = await blob.arrayBuffer();

  const fileExt = extensionFromUri(uri);
  const path = `${userId}/${vehicleId}/${activityId}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from(VEHICLE_ACTIVITY_PHOTO_BUCKET)
    .upload(path, bytes, { contentType: blob.type || 'image/jpeg', upsert: false });

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage.from(VEHICLE_ACTIVITY_PHOTO_BUCKET).getPublicUrl(path);

  return {
    data: data.publicUrl,
    error: null,
  };
}
