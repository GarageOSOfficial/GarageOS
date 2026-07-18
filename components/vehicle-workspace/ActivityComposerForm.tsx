import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ACTIVITY_TYPES, ActivityInput, ActivityType } from '@/types';

interface ActivityComposerFormProps {
  values: ActivityInput;
  setValues: Dispatch<SetStateAction<ActivityInput>>;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (nextValues: ActivityInput) => void;
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ActivityComposerForm({
  values,
  setValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: ActivityComposerFormProps) {
  const [photosInput, setPhotosInput] = useState(values.photos.join('\n'));
  const [attachmentsInput, setAttachmentsInput] = useState(values.attachments.join('\n'));
  const [metadataInput, setMetadataInput] = useState(
    values.metadata ? JSON.stringify(values.metadata, null, 2) : '{}'
  );

  const metadataError = useMemo(() => {
    try {
      JSON.parse(metadataInput || '{}');
      return null;
    } catch {
      return 'Metadata must be valid JSON.';
    }
  }, [metadataInput]);

  const buildNextValues = () => {
    const parsedMetadata = JSON.parse(metadataInput || '{}') as ActivityInput['metadata'];
    return {
      ...values,
      photos: splitLines(photosInput),
      attachments: splitLines(attachmentsInput),
      metadata: parsedMetadata,
    };
  };

  return (
    <View style={styles.formWrap}>
      <Text style={styles.label}>Activity Type</Text>
      <View style={styles.typeRow}>
        {ACTIVITY_TYPES.map((type) => {
          const selected = values.activity_type === type;
          return (
            <Pressable
              key={type}
              style={[styles.typeButton, selected ? styles.typeButtonSelected : null]}
              onPress={() =>
                setValues((current) => ({
                  ...current,
                  activity_type: type as ActivityType,
                }))
              }>
              <Text style={[styles.typeButtonText, selected ? styles.typeButtonTextSelected : null]}>{type}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Activity title"
        placeholderTextColor="#64748B"
        value={values.title}
        onChangeText={(value) =>
          setValues((current) => ({
            ...current,
            title: value,
          }))
        }
      />

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#64748B"
        value={values.activity_date}
        onChangeText={(value) =>
          setValues((current) => ({
            ...current,
            activity_date: value,
          }))
        }
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        placeholderTextColor="#64748B"
        multiline
        value={values.description}
        onChangeText={(value) =>
          setValues((current) => ({
            ...current,
            description: value,
          }))
        }
      />

      <Text style={styles.label}>Photos (one URL or local URI per line)</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="https://... or file://..."
        placeholderTextColor="#64748B"
        multiline
        value={photosInput}
        onChangeText={setPhotosInput}
      />

      <Text style={styles.label}>Attachments (one URL per line)</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="https://..."
        placeholderTextColor="#64748B"
        multiline
        value={attachmentsInput}
        onChangeText={setAttachmentsInput}
      />

      <Text style={styles.label}>Metadata (JSON)</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="{}"
        placeholderTextColor="#64748B"
        multiline
        value={metadataInput}
        onChangeText={setMetadataInput}
      />

      {metadataError ? <Text style={styles.errorText}>{metadataError}</Text> : null}

      <Pressable
        style={[styles.saveButton, (isSubmitting || !!metadataError) ? styles.saveButtonDisabled : null]}
        disabled={isSubmitting || !!metadataError}
        onPress={() => {
          const nextValues = buildNextValues();
          setValues(nextValues);
          onSubmit(nextValues);
        }}>
        <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : submitLabel}</Text>
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
    marginBottom: 2,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#1E293B',
  },
  typeButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  typeButtonText: {
    color: '#CBD5E1',
    fontWeight: '600',
    fontSize: 12,
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
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
  multilineInput: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FCA5A5',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
