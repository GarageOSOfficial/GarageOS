import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ActivityComposerForm, VehicleWorkspaceHeader } from '@/components/vehicle-workspace';
import { createVehicleActivity, updateVehicleActivity } from '@/services/api';
import { uploadVehicleActivityPhoto } from '@/services/storage';
import { ActivityInput } from '@/types';

import { useVehicleWorkspace } from '../workspace';
import { defaultActivityInput, isLocalFileUri } from './shared';

export default function NewActivityScreen() {
  const { vehicle, vehicleId, user, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const [values, setValues] = useState<ActivityInput>(defaultActivityInput);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (nextValues: ActivityInput) => {
    if (!user || !vehicleId) {
      return;
    }

    if (!nextValues.title.trim()) {
      setSubmitError('Title is required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const localPhotos = nextValues.photos.filter((item) => isLocalFileUri(item));
    const remotePhotos = nextValues.photos.filter((item) => !isLocalFileUri(item));

    const { data, error } = await createVehicleActivity(user.id, vehicleId, {
      ...nextValues,
      photos: remotePhotos,
    });

    if (error || !data) {
      setSubmitError(error?.message ?? 'Unable to create activity.');
      setIsSubmitting(false);
      return;
    }

    if (localPhotos.length) {
      const uploadedPhotos: string[] = [];

      for (const uri of localPhotos) {
        const uploadResult = await uploadVehicleActivityPhoto(user.id, vehicleId, data.id, uri);
        if (uploadResult.error || !uploadResult.data) {
          setSubmitError(uploadResult.error?.message ?? 'One or more photos failed to upload.');
          continue;
        }

        uploadedPhotos.push(uploadResult.data);
      }

      if (uploadedPhotos.length) {
        const updateResult = await updateVehicleActivity(user.id, vehicleId, data.id, {
          ...nextValues,
          photos: [...remotePhotos, ...uploadedPhotos],
        });

        if (updateResult.error) {
          setSubmitError(updateResult.error.message);
          setIsSubmitting(false);
          return;
        }
      }
    }

    setIsSubmitting(false);
    router.replace({
      pathname: '/vehicle/[vehicleId]/activity/[activityId]',
      params: { vehicleId, activityId: data.id },
    });
  };

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
        showNewActivityButton={false}
      />

      <Text style={styles.sectionHeader}>New Activity</Text>

      {submitError ? <Text style={styles.feedbackText}>{submitError}</Text> : null}

      <ActivityComposerForm
        values={values}
        setValues={setValues}
        isSubmitting={isSubmitting}
        submitLabel="Create Activity"
        onSubmit={submit}
      />
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
  feedbackText: {
    color: '#FCA5A5',
    marginBottom: 10,
  },
});
