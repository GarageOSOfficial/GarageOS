import { DocumentPickerAsset } from 'expo-document-picker';

import { supabase } from '@/services/auth';

const VEHICLE_DOCUMENT_BUCKET = 'vehicle-documents';

const SUPPORTED_DOCUMENT_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'heic', 'heif'];
const SUPPORTED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
];

function extensionFromFileName(fileName: string) {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

function normalizeExtension(extension: string) {
  return extension === 'jpeg' ? 'jpg' : extension;
}

function sanitizeFileName(value: string) {
  return value
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();
}

export function isSupportedDocumentAsset(asset: Pick<DocumentPickerAsset, 'name' | 'mimeType'>) {
  const extension = normalizeExtension(extensionFromFileName(asset.name));
  const normalizedMimeType = asset.mimeType?.toLowerCase() ?? '';

  return SUPPORTED_DOCUMENT_EXTENSIONS.includes(extension) || SUPPORTED_DOCUMENT_MIME_TYPES.includes(normalizedMimeType);
}

function resolveMimeType(asset: Pick<DocumentPickerAsset, 'name' | 'mimeType'>) {
  const extension = normalizeExtension(extensionFromFileName(asset.name));

  if (asset.mimeType) {
    return asset.mimeType;
  }

  if (extension === 'pdf') {
    return 'application/pdf';
  }

  if (['jpg', 'png', 'heic', 'heif'].includes(extension)) {
    return `image/${extension === 'jpg' ? 'jpeg' : extension}`;
  }

  return 'application/octet-stream';
}

export async function uploadVehicleDocumentFile(userId: string, vehicleId: string, asset: DocumentPickerAsset) {
  const response = await fetch(asset.uri);
  const blob = await response.blob();
  const bytes = await blob.arrayBuffer();

  const normalizedExtension = normalizeExtension(extensionFromFileName(asset.name) || 'pdf');
  const mimeType = resolveMimeType(asset);
  const fileName = sanitizeFileName(asset.name || `document-${Date.now()}.${normalizedExtension}`);
  const path = `${userId}/${vehicleId}/${Date.now()}-${fileName}`;

  const { error } = await supabase.storage
    .from(VEHICLE_DOCUMENT_BUCKET)
    .upload(path, bytes, { contentType: mimeType, upsert: false });

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage.from(VEHICLE_DOCUMENT_BUCKET).getPublicUrl(path);

  return {
    data: {
      fileName: asset.name,
      fileSizeBytes: asset.size ?? blob.size,
      fileExt: normalizedExtension,
      mimeType,
      bucket: VEHICLE_DOCUMENT_BUCKET,
      path,
      url: data.publicUrl,
    },
    error: null,
  };
}

export async function deleteVehicleDocumentFile(storagePath: string) {
  const { error } = await supabase.storage.from(VEHICLE_DOCUMENT_BUCKET).remove([storagePath]);

  return { error };
}

export function buildVehicleDocumentDownloadUrl(fileUrl: string, fileName: string) {
  const separator = fileUrl.includes('?') ? '&' : '?';
  return `${fileUrl}${separator}download=${encodeURIComponent(fileName)}`;
}
