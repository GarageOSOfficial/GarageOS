import { ActivityInput, Activity } from '@/types';

export const defaultActivityInput: ActivityInput = {
  activity_type: 'Progress Update',
  title: '',
  description: '',
  activity_date: new Date().toISOString().slice(0, 10),
  photos: [],
  attachments: [],
  metadata: {},
};

export function toActivityInput(activity: Activity): ActivityInput {
  return {
    activity_type: activity.activity_type,
    title: activity.title,
    description: activity.description ?? '',
    activity_date: activity.activity_date,
    photos: activity.photos,
    attachments: activity.attachments,
    metadata: activity.metadata ?? {},
  };
}

export function isLocalFileUri(value: string) {
  return value.startsWith('file://') || value.startsWith('content://');
}
