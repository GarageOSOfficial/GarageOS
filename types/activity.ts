export const ACTIVITY_TYPES = [
  'Purchased Part',
  'Installed Part',
  'Maintenance',
  'Progress Update',
  'Journal Entry',
  'Record Upload',
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export type ActivityMetadataValue =
  | string
  | number
  | boolean
  | null
  | ActivityMetadataValue[]
  | { [key: string]: ActivityMetadataValue };

export interface Activity {
  id: string;
  vehicle_id: string;
  user_id: string;
  activity_type: ActivityType;
  title: string;
  description: string | null;
  activity_date: string;
  created_at: string;
  updated_at: string | null;
  photos: string[];
  attachments: string[];
  metadata: { [key: string]: ActivityMetadataValue } | null;
}

export interface ActivityInput {
  activity_type: ActivityType;
  title: string;
  description: string;
  activity_date: string;
  photos: string[];
  attachments: string[];
  metadata: { [key: string]: ActivityMetadataValue } | null;
}

export interface ActivityDocumentationHooks {
  totalActivities: number;
  activitiesWithPhotos: number;
  activitiesWithAttachments: number;
  lastActivityDate: string | null;
}
