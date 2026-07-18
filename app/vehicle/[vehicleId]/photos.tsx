import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PhotoGrid, PhotoLightbox, VehiclePhotoItem, VehicleWorkspaceHeader } from '@/components/vehicle-workspace';

import { useVehicleActivities } from './use-activities';
import { useVehicleWorkspace } from './workspace';

export default function VehiclePhotosScreen() {
  const { vehicle, user, vehicleId, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const { activities, isLoading: isLoadingActivities, errorMessage } = useVehicleActivities(user?.id, vehicleId);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const photos = useMemo<VehiclePhotoItem[]>(() => {
    if (!vehicle || !activities.length) {
      return [];
    }

    return activities.flatMap((activity) =>
      activity.photos.map((url, index) => ({
        id: `${activity.id}-${index}`,
        url,
        label: activity.title,
      }))
    );
  }, [activities, vehicle]);

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxVisible(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <VehicleWorkspaceHeader
        vehicleId={vehicleId}
        title={vehicleTitle}
        subtitle={vehicleSubtitle}
        activeSection="photos"
      />

      <Text style={styles.sectionHeader}>Photos</Text>
      {errorMessage ? <Text style={styles.listErrorText}>{errorMessage}</Text> : null}
      <PhotoGrid
        photos={photos}
        onPhotoPress={openLightbox}
        onAddPhotos={() =>
          Alert.alert('Add Photos', 'Create or edit an activity and add photo URIs to attach images to it.', [
            {
              text: 'New Activity',
              onPress: () =>
                router.push({
                  pathname: '/vehicle/[vehicleId]/activity/new',
                  params: { vehicleId },
                }),
            },
            { text: 'Cancel', style: 'cancel' },
          ])
        }
      />

      <PhotoLightbox
        photos={photos}
        visible={isLightboxVisible}
        selectedIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
        onClose={() => setIsLightboxVisible(false)}
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
  listErrorText: {
    color: '#FCA5A5',
    marginBottom: 10,
  },
});
