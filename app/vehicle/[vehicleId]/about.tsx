import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { VehicleDetailsForm, VehicleWorkspaceHeader } from '@/components/vehicle-workspace';
import { updateUserVehicle } from '@/services/api';
import { VehicleUpdateInput } from '@/types';

import { toVehicleFormValues, useVehicleWorkspace } from './workspace';

const emptyValues: VehicleUpdateInput = {
  year: '',
  make: '',
  model: '',
  trim: '',
  vin: '',
  color: '',
  mileage: '',
  engine: '',
  transmission: '',
  notes: '',
};

export default function VehicleAboutScreen() {
  const {
    vehicle,
    setVehicle,
    vehicleId,
    user,
    isLoading,
    feedbackMessage,
    setFeedbackMessage,
    vehicleTitle,
    vehicleSubtitle,
  } = useVehicleWorkspace();
  const [values, setValues] = useState<VehicleUpdateInput>(emptyValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicle) {
      return;
    }

    setValues(toVehicleFormValues(vehicle));
  }, [vehicle]);

  const saveDetails = async () => {
    if (!user || !vehicleId) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    const { data, error } = await updateUserVehicle(user.id, vehicleId, values);

    if (error || !data) {
      setFeedbackMessage(error?.message ?? 'Unable to save vehicle details.');
      setIsSubmitting(false);
      return;
    }

    setVehicle(data);
    setFeedbackMessage(null);
    setSuccessMessage('Vehicle details saved.');
    setIsSubmitting(false);
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
      <VehicleWorkspaceHeader vehicleId={vehicleId} title={vehicleTitle} subtitle={vehicleSubtitle} activeSection="about" />

      <Text style={styles.sectionHeader}>About</Text>

      {feedbackMessage ? <Text style={styles.feedbackText}>{feedbackMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      <VehicleDetailsForm values={values} setValues={setValues} isSubmitting={isSubmitting} onSubmit={saveDetails} />
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
  successText: {
    color: '#86EFAC',
    marginBottom: 10,
  },
});
