import { StyleSheet, Text, View } from 'react-native';

interface RecentActivityItem {
  id: string;
  title: string;
  detail: string;
}

interface RecentActivityListProps {
  activities: RecentActivityItem[];
  emptyMessage: string;
}

export function RecentActivityList({ activities, emptyMessage }: RecentActivityListProps) {
  if (!activities.length) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No recent activity</Text>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.listWrap}>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.itemCard}>
          <Text style={styles.itemTitle}>{activity.title}</Text>
          <Text style={styles.itemDetail}>{activity.detail}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listWrap: {
    gap: 10,
  },
  itemCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  itemDetail: {
    color: '#CBD5E1',
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#CBD5E1',
    marginTop: 6,
  },
});
