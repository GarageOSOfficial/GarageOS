import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { VehicleUpdateInput } from '@/types';

interface VehicleDetailsFormProps {
  values: VehicleUpdateInput;
  setValues: Dispatch<SetStateAction<VehicleUpdateInput>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const fields: { key: keyof VehicleUpdateInput; label: string; multiline?: boolean; keyboardType?: 'numeric' }[] = [
  { key: 'year', label: 'Year', keyboardType: 'numeric' },
  { key: 'make', label: 'Make' },
  { key: 'model', label: 'Model' },
  { key: 'trim', label: 'Trim' },
  { key: 'vin', label: 'VIN' },
  { key: 'color', label: 'Color' },
  { key: 'mileage', label: 'Mileage', keyboardType: 'numeric' },
  { key: 'engine', label: 'Engine' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'notes', label: 'Notes', multiline: true },
];

export function VehicleDetailsForm({ values, setValues, isSubmitting, onSubmit }: VehicleDetailsFormProps) {
  return (
    <View style={styles.formWrap}>
      {fields.map((field) => (
        <View key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={values[field.key]}
            onChangeText={(value) =>
              setValues((current) => ({
                ...current,
                [field.key]: value,
              }))
            }
            keyboardType={field.keyboardType}
            placeholder={field.label}
            placeholderTextColor="#64748B"
            multiline={field.multiline}
            style={[styles.input, field.multiline ? styles.inputMultiline : null]}
          />
        </View>
      ))}
      <Pressable style={styles.saveButton} disabled={isSubmitting} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : 'Save Details'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrap: {
    gap: 10,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
