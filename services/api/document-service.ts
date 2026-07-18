import { supabase } from '@/services/auth';
import { VehicleDocument, VehicleDocumentInput, VehicleDocumentType } from '@/types';

const VEHICLE_DOCUMENTS_TABLE = 'vehicle_documents';

const VEHICLE_DOCUMENT_COLUMNS =
  'id, vehicle_id, user_id, document_type, title, description, document_date, tags, file_name, file_ext, mime_type, file_size_bytes, storage_bucket, storage_path, file_url, uploaded_by, created_at, updated_at';

function toVehicleDocumentPayload(payload: VehicleDocumentInput) {
  return {
    document_type: payload.document_type,
    title: payload.title.trim(),
    description: payload.description.trim() || null,
    document_date: payload.document_date.trim() || null,
    tags: payload.tags,
    file_name: payload.file_name,
    file_ext: payload.file_ext,
    mime_type: payload.mime_type || null,
    file_size_bytes: payload.file_size_bytes,
    storage_bucket: payload.storage_bucket,
    storage_path: payload.storage_path,
    file_url: payload.file_url,
    uploaded_by: payload.uploaded_by,
  };
}

export async function listVehicleDocuments(userId: string, vehicleId: string) {
  const { data, error } = await supabase
    .from(VEHICLE_DOCUMENTS_TABLE)
    .select(VEHICLE_DOCUMENT_COLUMNS)
    .eq('user_id', userId)
    .eq('vehicle_id', vehicleId)
    .order('document_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  return {
    data: (data as VehicleDocument[] | null) ?? [],
    error,
  };
}

export async function createVehicleDocument(userId: string, vehicleId: string, payload: VehicleDocumentInput) {
  const { data, error } = await supabase
    .from(VEHICLE_DOCUMENTS_TABLE)
    .insert({
      user_id: userId,
      vehicle_id: vehicleId,
      ...toVehicleDocumentPayload(payload),
    })
    .select(VEHICLE_DOCUMENT_COLUMNS)
    .single();

  return {
    data: (data as VehicleDocument | null) ?? null,
    error,
  };
}

export async function deleteVehicleDocument(userId: string, vehicleId: string, documentId: string) {
  const { error } = await supabase
    .from(VEHICLE_DOCUMENTS_TABLE)
    .delete()
    .eq('id', documentId)
    .eq('vehicle_id', vehicleId)
    .eq('user_id', userId);

  return { error };
}

export function filterVehicleDocuments(
  documents: VehicleDocument[],
  searchQuery: string,
  selectedType: VehicleDocumentType | 'All'
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return documents.filter((document) => {
    if (selectedType !== 'All' && document.document_type !== selectedType) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const tagMatch = document.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return document.title.toLowerCase().includes(normalizedQuery) || tagMatch;
  });
}
