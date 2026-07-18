import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PhotoGrid, PhotoLightbox, VehiclePhotoItem, VehicleWorkspaceHeader } from '@/components/vehicle-workspace';

import { useVehicleWorkspace } from './workspace';

export default function VehiclePhotosScreen() {
  const { vehicle, vehicleId, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const photos = useMemo<VehiclePhotoItem[]>(() => {
    if (!vehicle) {
      return [];
    }

    const items: VehiclePhotoItem[] = [];

    if (vehicle.image_url) {
      items.push({ id: 'hero', url: vehicle.image_url, label: 'Hero photo' });
    }

    items.push(
      {
        id: 'placeholder-1',
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
        label: 'Front quarter view',
      },
      {
        id: 'placeholder-2',
        url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
        label: 'Garage profile',
      },
      {
        id: 'placeholder-3',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        label: 'Rear view',
      }
    );

    return items;
  }, [vehicle]);

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
      <PhotoGrid
        photos={photos}
        onPhotoPress={openLightbox}
        onAddPhotos={() => Alert.alert('Add Photos', 'Photo upload is coming in a future sprint.')}
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
});
