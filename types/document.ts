export const VEHICLE_DOCUMENT_TYPES = [
  'Receipts',
  'Manuals',
  'Registration',
  'Insurance',
  'Wiring Diagrams',
  'Paint Codes',
  'Build Sheets',
  'Dyno Sheets',
  'Inspection Reports',
  'Other',
] as const;

export type VehicleDocumentType = (typeof VEHICLE_DOCUMENT_TYPES)[number];

export interface VehicleDocument {
  id: string;
  vehicle_id: string;
  user_id: string;
  document_type: VehicleDocumentType;
  title: string;
  description: string | null;
  document_date: string | null;
  tags: string[];
  file_name: string;
  file_ext: string;
  mime_type: string | null;
  file_size_bytes: number;
  storage_bucket: string;
  storage_path: string;
  file_url: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string | null;
}

export interface VehicleDocumentInput {
  document_type: VehicleDocumentType;
  title: string;
  description: string;
  document_date: string;
  tags: string[];
  file_name: string;
  file_ext: string;
  mime_type: string;
  file_size_bytes: number;
  storage_bucket: string;
  storage_path: string;
  file_url: string;
  uploaded_by: string;
}

export interface DocumentationScoreCategory {
  key:
    | 'vehicleInformation'
    | 'photos'
    | 'activities'
    | 'receipts'
    | 'manuals'
    | 'maintenanceRecords'
    | 'requiredDocuments';
  label: string;
  score: number;
}

export interface DocumentationScore {
  totalScore: number;
  categories: DocumentationScoreCategory[];
}
