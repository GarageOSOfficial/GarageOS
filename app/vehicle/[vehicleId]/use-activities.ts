import { useCallback, useEffect, useState } from 'react';

import { listVehicleActivities } from '@/services/api';
import { Activity } from '@/types';

export function useVehicleActivities(userId: string | undefined, vehicleId: string | undefined) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    if (!userId || !vehicleId) {
      setActivities([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await listVehicleActivities(userId, vehicleId);

    if (error) {
      setErrorMessage(error.message);
      setActivities([]);
      setIsLoading(false);
      return;
    }

    setActivities(data);
    setErrorMessage(null);
    setIsLoading(false);
  }, [userId, vehicleId]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return {
    activities,
    setActivities,
    isLoading,
    errorMessage,
    loadActivities,
  };
}
