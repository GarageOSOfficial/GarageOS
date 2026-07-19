import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

export interface VehiclePhotoItem {
  id: string;
  url: string;
  label?: string;
}

interface PhotoLightboxProps {
  photos: VehiclePhotoItem[];
  visible: boolean;
  selectedIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function PhotoLightbox({ photos, visible, selectedIndex, onClose, onSelectIndex }: PhotoLightboxProps) {
  const currentPhoto = photos[selectedIndex] ?? null;

  if (!currentPhoto) {
    return null;
  }

  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex < photos.length - 1;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        <Image source={currentPhoto.url} style={styles.image} contentFit="contain" />
        {currentPhoto.label ? <Text style={styles.label}>{currentPhoto.label}</Text> : null}

        <View style={styles.controlsRow}>
          <Pressable
            style={[styles.controlButton, !hasPrevious ? styles.controlButtonDisabled : null]}
            disabled={!hasPrevious}
            onPress={() => onSelectIndex(selectedIndex - 1)}>
            <Text style={styles.controlButtonText}>Previous</Text>
          </Pressable>
          <Pressable
            style={[styles.controlButton, !hasNext ? styles.controlButtonDisabled : null]}
            disabled={!hasNext}
            onPress={() => onSelectIndex(selectedIndex + 1)}>
            <Text style={styles.controlButtonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 54,
    right: 22,
    backgroundColor: '#1E293B',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: '65%',
  },
  label: {
    color: '#E2E8F0',
    marginTop: 12,
  },
  controlsRow: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  controlButtonDisabled: {
    backgroundColor: '#334155',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
