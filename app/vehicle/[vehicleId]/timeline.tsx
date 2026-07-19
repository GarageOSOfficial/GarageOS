import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import {
  activitySummary,
  activityTypeIcon,
  formatActivityDate,
  VehicleWorkspaceHeader,
} from '@/components/vehicle-workspace';

import { useVehicleActivities } from './use-activities';
import { useVehicleWorkspace } from './workspace';

export default function VehicleTimelineScreen() {
  const { vehicle, user, vehicleId, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const { activities, isLoading: isLoadingActivities, errorMessage } = useVehicleActivities(user?.id, vehicleId);

  if (isLoading || isLoadingActivities) {
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

      {errorMessage ? <Text style={styles.listErrorText}>{errorMessage}</Text> : null}

      {activities.length ? (
        <View style={styles.timelineWrap}>
          {activities.map((item) => (
            <Pressable
              key={item.id}
              style={styles.timelineItem}
              onPress={() =>
                router.push({
                  pathname: '/vehicle/[vehicleId]/activity/[activityId]',
                  params: { vehicleId, activityId: item.id },
                })
              }>
              <View style={styles.timelineRow}>
                <Text style={styles.timelineIcon}>{activityTypeIcon(item.activity_type)}</Text>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{formatActivityDate(item.activity_date)}</Text>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineType}>{item.activity_type}</Text>
                  <Text style={styles.timelineDetail}>{activitySummary(item.description)}</Text>
                </View>
                {item.photos[0] ? <Image source={item.photos[0]} style={styles.thumbnail} contentFit="cover" /> : null}
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No activities yet</Text>
          <Text style={styles.emptyText}>Create your first activity to start documenting this build.</Text>
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
  timelineRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  timelineIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
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
  timelineType: {
    color: '#86EFAC',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  timelineDetail: {
    color: '#CBD5E1',
    marginTop: 4,
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0B1220',
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
  listErrorText: {
    color: '#FCA5A5',
    marginBottom: 10,
  },
});
