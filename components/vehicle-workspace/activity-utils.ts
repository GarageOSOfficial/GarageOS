import { ActivityType } from '@/types';

const activityIcons: Record<ActivityType, string> = {
  'Purchased Part': '🛒',
  'Installed Part': '🔧',
  Maintenance: '🧰',
  'Progress Update': '📈',
  'Journal Entry': '📓',
  'Record Upload': '📎',
};

export function activityTypeIcon(type: ActivityType) {
  return activityIcons[type] ?? '📝';
}

export function formatActivityDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function activitySummary(description: string | null) {
  if (!description?.trim()) {
    return 'No summary available.';
  }

  const trimmed = description.trim();
  return trimmed.length > 120 ? `${trimmed.slice(0, 120)}…` : trimmed;
}
