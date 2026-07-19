import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/hooks';
import { listGarageVehicles, listUserGarages } from '@/services/api';
import { Garage, GarageVehicle } from '@/types';

export default function GarageScreen() {
  const { garageId } = useLocalSearchParams<{ garageId: string }>();
  const { user } = useAuth();
  const [garage, setGarage] = useState<Garage | null>(null);
  const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const loadGarage = useCallback(async () => {
    if (!user || !garageId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const [garageResponse, vehicleResponse] = await Promise.all([
      listUserGarages(user.id),
      listGarageVehicles(user.id, garageId),
    ]);

    if (garageResponse.error) {
      setFeedbackMessage(garageResponse.error.message);
      setIsLoading(false);
      return;
    }

    if (vehicleResponse.error) {
      setFeedbackMessage(vehicleResponse.error.message);
      setIsLoading(false);
      return;
    }

    setGarage(garageResponse.data.find((item) => item.id === garageId) ?? null);
    setVehicles(vehicleResponse.data);
    setFeedbackMessage(null);
    setIsLoading(false);
  }, [garageId, user]);

  useEffect(() => {
    loadGarage();
  }, [loadGarage]);

  const goToVehicle = (vehicleId: string) => {
    router.push({
      pathname: '/vehicle/[vehicleId]',
      params: { vehicleId },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#93C5FD" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{garage?.name ?? 'Garage'}</Text>
          <Text style={styles.subtitle}>{garage?.description || 'Vehicle management'}</Text>

          {feedbackMessage ? <Text style={styles.feedbackText}>{feedbackMessage}</Text> : null}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Vehicles ({vehicles.length})</Text>
            <Text style={styles.sectionSubtitle}>Manage vehicles assigned to this garage.</Text>
          </View>

          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyStateCard}>
                <Text style={styles.emptyStateTitle}>No vehicles in this garage</Text>
                <Text style={styles.emptyStateText}>
                  Add vehicles in a future vehicle sprint to begin tracking this garage.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable style={styles.vehicleCard} onPress={() => goToVehicle(item.id)}>
                <Text style={styles.vehicleName}>
                  {[item.year, item.make, item.model].filter(Boolean).join(' ') || 'Vehicle'}
                </Text>
                {item.trim ? <Text style={styles.vehicleMeta}>{item.trim}</Text> : null}
                {item.nickname ? <Text style={styles.vehicleMeta}>Nickname: {item.nickname}</Text> : null}
                <Text style={styles.vehicleMeta}>Mileage: {item.mileage ?? 0}</Text>
                <Text style={styles.vehicleLink}>Open Workspace</Text>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  backButtonText: {
    color: '#E2E8F0',
    fontWeight: '600',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 14,
  },
  feedbackText: {
    color: '#FCA5A5',
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#CBD5E1',
    marginTop: 4,
  },
  listContent: {
    gap: 10,
    paddingBottom: 20,
  },
  emptyStateCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 18,
  },
  emptyStateTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyStateText: {
    color: '#CBD5E1',
    marginTop: 6,
  },
  vehicleCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  vehicleName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  vehicleMeta: {
    color: '#CBD5E1',
    marginTop: 4,
  },
  vehicleLink: {
    color: '#93C5FD',
    marginTop: 10,
    fontWeight: '600',
  },
});
