import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { QuickStats, RecentActivityList, VehicleWorkspaceHeader } from '@/components/vehicle-workspace';

import { useVehicleWorkspace } from './workspace';

const placeholderRecentActivity = [
  { id: '1', title: 'Engine tune-up recorded', detail: 'Placeholder activity entry • 3 days ago' },
  { id: '2', title: 'Photo set reviewed', detail: 'Placeholder activity entry • 1 week ago' },
];

export default function VehicleOverviewScreen() {
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
        activeSection="overview"
      />

      <View style={styles.heroCard}>
        {vehicle.image_url ? (
          <Image source={vehicle.image_url} style={styles.heroImage} contentFit="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroPlaceholderText}>No hero photo</Text>
          </View>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Vehicle Summary</Text>
        <Text style={styles.metaText}>Nickname: {vehicle.nickname ?? '—'}</Text>
        <Text style={styles.metaText}>VIN: {vehicle.vin ?? '—'}</Text>
        <Text style={styles.metaText}>Color: {vehicle.color ?? '—'}</Text>
      </View>

      <Text style={styles.sectionHeader}>Quick Stats</Text>
      <QuickStats vehicle={vehicle} />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Documentation Score</Text>
        <Text style={styles.placeholderText}>Placeholder metric will be available in a future sprint.</Text>
      </View>

      <Text style={styles.sectionHeader}>Recent Activity</Text>
      <RecentActivityList activities={placeholderRecentActivity} emptyMessage="Activity feed is not available yet." />
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
    paddingBottom: 28,
    gap: 14,
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
  heroCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  heroPlaceholder: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: '#94A3B8',
  },
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  metaText: {
    color: '#CBD5E1',
    marginTop: 4,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 2,
  },
  placeholderText: {
    color: '#CBD5E1',
  },
});
