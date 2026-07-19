import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';

import { VehiclePhotoItem } from './PhotoLightbox';

interface PhotoGridProps {
  photos: VehiclePhotoItem[];
  onPhotoPress: (index: number) => void;
  onAddPhotos: () => void;
}

export function PhotoGrid({ photos, onPhotoPress, onAddPhotos }: PhotoGridProps) {
  const { width } = useWindowDimensions();
  const columns = width >= 1080 ? 4 : width >= 720 ? 3 : 2;

  if (!photos.length) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No photos yet</Text>
        <Text style={styles.emptyText}>Upload images to build your vehicle history.</Text>
        <Pressable style={styles.addButton} onPress={onAddPhotos}>
          <Text style={styles.addButtonText}>Add Photos</Text>
        </Pressable>
      </View>
    );
  }

  const cellWidth = (width - 56 - (columns - 1) * 10) / columns;

  return (
    <View>
      <View style={styles.gridWrap}>
        {photos.map((photo, index) => (
          <Pressable key={photo.id} onPress={() => onPhotoPress(index)}>
            <Image source={photo.url} style={[styles.photo, { width: cellWidth, height: cellWidth }]} contentFit="cover" />
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.addButton} onPress={onAddPhotos}>
        <Text style={styles.addButtonText}>Add Photos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photo: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
  },
  addButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
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
