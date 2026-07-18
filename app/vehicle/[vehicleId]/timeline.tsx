import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { VehicleWorkspaceHeader } from '@/components/vehicle-workspace';

import { useVehicleWorkspace } from './workspace';

const timelineItems = [
  { id: '1', date: '2026-07-15', title: 'Oil service logged', detail: 'Placeholder timeline item.' },
  { id: '2', date: '2026-07-08', title: 'Brake inspection completed', detail: 'Placeholder timeline item.' },
  { id: '3', date: '2026-07-01', title: 'Photo album synced', detail: 'Placeholder timeline item.' },
];

export default function VehicleTimelineScreen() {
  const { vehicle, vehicleId, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#93C5FD" />
      </View>
    );
  }

  if (!vehicle || !vehicleId) {
    return (
      <View style={styles.errorWrap}>
        <Text style={styles.errorText}>{feedbackMessage ?? 'Vehicle not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <VehicleWorkspaceHeader
        vehicleId={vehicleId}
        title={vehicleTitle}
        subtitle={vehicleSubtitle}
        activeSection="timeline"
      />

      <Text style={styles.sectionHeader}>Timeline</Text>

      {timelineItems.length ? (
        <View style={styles.timelineWrap}>
          {timelineItems.map((item) => (
            <View key={item.id} style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{item.date}</Text>
              <Text style={styles.timelineTitle}>{item.title}</Text>
              <Text style={styles.timelineDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No activities yet</Text>
          <Text style={styles.emptyText}>Timeline activity will appear here once available.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 24,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0F172A',
  },
  errorText: {
    color: '#FCA5A5',
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  timelineWrap: {
    gap: 10,
  },
  timelineItem: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  timelineDate: {
    color: '#93C5FD',
    fontWeight: '600',
    fontSize: 12,
  },
  timelineTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  timelineDetail: {
    color: '#CBD5E1',
    marginTop: 4,
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
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    color: '#CBD5E1',
    marginTop: 6,
  },
});
