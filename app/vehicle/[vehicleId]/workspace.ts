import { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { useAuth } from '@/hooks';
import { getUserVehicle } from '@/services/api';
import { Vehicle } from '@/types';

export function useVehicleWorkspace() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const loadVehicle = useCallback(async () => {
    if (!user || !vehicleId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await getUserVehicle(user.id, vehicleId);

    if (error || !data) {
      setFeedbackMessage(error?.message ?? 'Vehicle not found.');
      setVehicle(null);
      setIsLoading(false);
      return;
    }

    setVehicle(data);
    setFeedbackMessage(null);
    setIsLoading(false);
  }, [user, vehicleId]);

  useEffect(() => {
    loadVehicle();
  }, [loadVehicle]);

  const vehicleTitle = [vehicle?.year, vehicle?.make, vehicle?.model].filter(Boolean).join(' ').trim() || 'Vehicle';
  const vehicleSubtitle = vehicle?.trim ?? vehicle?.nickname ?? 'Workspace';

  return {
    vehicle,
    setVehicle,
    vehicleId,
    isLoading,
    feedbackMessage,
    setFeedbackMessage,
    loadVehicle,
    user,
    vehicleTitle,
    vehicleSubtitle,
  };
}

export function toVehicleFormValues(vehicle: Vehicle) {
  return {
    year: vehicle.year?.toString() ?? '',
    make: vehicle.make ?? '',
    model: vehicle.model ?? '',
    trim: vehicle.trim ?? '',
    vin: vehicle.vin ?? '',
    color: vehicle.color ?? '',
    mileage: vehicle.mileage?.toString() ?? '',
    engine: vehicle.engine ?? '',
    transmission: vehicle.transmission ?? '',
    notes: vehicle.notes ?? '',
  };
}
