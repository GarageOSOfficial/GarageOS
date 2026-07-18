import { useCallback, useEffect, useState } from 'react';

import { listVehicleDocuments } from '@/services/api';
import { VehicleDocument } from '@/types';

export function useVehicleDocuments(userId: string | undefined, vehicleId: string | undefined) {
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    if (!userId || !vehicleId) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await listVehicleDocuments(userId, vehicleId);

    if (error) {
      setErrorMessage(error.message);
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    setDocuments(data);
    setErrorMessage(null);
    setIsLoading(false);
  }, [userId, vehicleId]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return {
    documents,
    setDocuments,
    isLoading,
    errorMessage,
    loadDocuments,
  };
}
