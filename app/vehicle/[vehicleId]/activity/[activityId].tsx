import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import {
  ActivityComposerForm,
  activitySummary,
  activityTypeIcon,
  formatActivityDate,
  VehicleWorkspaceHeader,
} from '@/components/vehicle-workspace';
import { deleteVehicleActivity, getVehicleActivity, updateVehicleActivity } from '@/services/api';
import { uploadVehicleActivityPhoto } from '@/services/storage';
import { Activity, ActivityInput } from '@/types';

import { useVehicleWorkspace } from '../workspace';
import { isLocalFileUri, toActivityInput } from './shared';

export default function ActivityDetailScreen() {
  const { activityId, vehicleId } = useLocalSearchParams<{ activityId: string; vehicleId: string }>();
  const { user, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, setValues] = useState<ActivityInput | null>(null);

  const loadActivity = useCallback(async () => {
    if (!user || !vehicleId || !activityId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await getVehicleActivity(user.id, vehicleId, activityId);

    if (error || !data) {
      setErrorMessage(error?.message ?? 'Activity not found.');
      setActivity(null);
      setIsLoading(false);
      return;
    }

    setActivity(data);
    setValues(toActivityInput(data));
    setErrorMessage(null);
    setIsLoading(false);
  }, [activityId, user, vehicleId]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const onDelete = () => {
    if (!user || !vehicleId || !activityId || !activity) {
      return;
    }

    Alert.alert('Delete Activity', `Delete \"${activity.title}\"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const { error } = await deleteVehicleActivity(user.id, vehicleId, activityId);
          if (error) {
            setErrorMessage(error.message);
            return;
          }

          router.replace({
            pathname: '/vehicle/[vehicleId]/timeline',
            params: { vehicleId },
          });
        },
      },
    ]);
  };

  const onSave = async (nextValues: ActivityInput) => {
    if (!user || !vehicleId || !activityId || !nextValues) {
      return;
    }

    if (!nextValues.title.trim()) {
      setErrorMessage('Title is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const localPhotos = nextValues.photos.filter((item) => isLocalFileUri(item));
    const remotePhotos = nextValues.photos.filter((item) => !isLocalFileUri(item));

    let nextPhotos = remotePhotos;

    if (localPhotos.length) {
      const uploadedPhotos: string[] = [];
      for (const uri of localPhotos) {
        const uploadResult = await uploadVehicleActivityPhoto(user.id, vehicleId, activityId, uri);
        if (uploadResult.error || !uploadResult.data) {
          setErrorMessage(uploadResult.error?.message ?? 'One or more photos failed to upload.');
          continue;
        }
        uploadedPhotos.push(uploadResult.data);
      }

      nextPhotos = [...remotePhotos, ...uploadedPhotos];
    }

    const { data, error } = await updateVehicleActivity(user.id, vehicleId, activityId, {
      ...nextValues,
      photos: nextPhotos,
    });

    if (error || !data) {
      setErrorMessage(error?.message ?? 'Unable to save activity.');
      setIsSubmitting(false);
      return;
    }

    setActivity(data);
    setValues(toActivityInput(data));
    setIsEditing(false);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.mutedText}>Loading activity...</Text>
      </View>
    );
  }

  if (!activity || !vehicleId) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.errorText}>{errorMessage ?? 'Activity not found.'}</Text>
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
        showNewActivityButton={false}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {isEditing && values ? (
        <View>
          <Text style={styles.sectionHeader}>Edit Activity</Text>
          <ActivityComposerForm
            values={values}
            setValues={setValues}
            submitLabel="Save Changes"
            isSubmitting={isSubmitting}
            onSubmit={onSave}
          />
          <Pressable style={styles.secondaryButton} onPress={() => setIsEditing(false)}>
            <Text style={styles.secondaryButtonText}>Cancel Editing</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.detailWrap}>
          <View style={styles.headerCard}>
            <Text style={styles.title}>{activityTypeIcon(activity.activity_type)} {activity.title}</Text>
            <Text style={styles.metaText}>{activity.activity_type}</Text>
            <Text style={styles.metaText}>{formatActivityDate(activity.activity_date)}</Text>
            <Text style={styles.summaryText}>{activitySummary(activity.description)}</Text>
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                setValues(toActivityInput(activity));
                setIsEditing(true);
              }}>
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionHeader}>Photos</Text>
          {activity.photos.length ? (
            <View style={styles.photoGrid}>
              {activity.photos.map((photo, index) => (
                <Image key={`${photo}-${index}`} source={photo} style={styles.photo} contentFit="cover" />
              ))}
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No Photos</Text>
              <Text style={styles.emptyText}>This activity does not have any uploaded photos yet.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Notes</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{activity.description?.trim() ? activity.description : 'No notes provided.'}</Text>
          </View>

          <Text style={styles.sectionHeader}>Attachments</Text>
          {activity.attachments.length ? (
            <View style={styles.card}>
              {activity.attachments.map((attachment, index) => (
                <Text key={`${attachment}-${index}`} style={styles.linkText}>{attachment}</Text>
              ))}
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No Attachments</Text>
              <Text style={styles.emptyText}>This activity does not have any attachments yet.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Metadata</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{JSON.stringify(activity.metadata ?? {}, null, 2)}</Text>
          </View>
        </View>
      )}

      {feedbackMessage ? <Text style={styles.mutedText}>{feedbackMessage}</Text> : null}
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
  centerWrap: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailWrap: {
    gap: 10,
  },
  headerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  metaText: {
    color: '#93C5FD',
    marginTop: 4,
  },
  summaryText: {
    color: '#CBD5E1',
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#7F1D1D',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 2,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  cardText: {
    color: '#CBD5E1',
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
    color: '#CBD5E1',
    marginTop: 6,
  },
  linkText: {
    color: '#93C5FD',
    marginBottom: 8,
  },
  errorText: {
    color: '#FCA5A5',
  },
  mutedText: {
    color: '#94A3B8',
  },
});
