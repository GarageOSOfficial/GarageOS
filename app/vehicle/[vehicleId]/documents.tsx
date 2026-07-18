import { useMemo, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { VehicleWorkspaceHeader } from '@/components/vehicle-workspace';
import { createVehicleDocument, deleteVehicleDocument, filterVehicleDocuments } from '@/services/api';
import {
  buildVehicleDocumentDownloadUrl,
  deleteVehicleDocumentFile,
  isSupportedDocumentAsset,
  uploadVehicleDocumentFile,
} from '@/services/storage';
import { VEHICLE_DOCUMENT_TYPES, VehicleDocumentType } from '@/types';

import { useVehicleDocuments } from './use-documents';
import { useVehicleWorkspace } from './workspace';

const SEARCH_FILTER_TYPES = ['All', ...VEHICLE_DOCUMENT_TYPES] as const;

type SearchFilterType = (typeof SEARCH_FILTER_TYPES)[number];

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function VehicleDocumentsScreen() {
  const { vehicle, user, vehicleId, isLoading, feedbackMessage, vehicleTitle, vehicleSubtitle } = useVehicleWorkspace();
  const { documents, isLoading: isLoadingDocuments, errorMessage, loadDocuments } = useVehicleDocuments(user?.id, vehicleId);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SearchFilterType>('All');
  const [newDocumentType, setNewDocumentType] = useState<VehicleDocumentType>('Receipts');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [documentDate, setDocumentDate] = useState(todayIsoDate());
  const [tagsInput, setTagsInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);

  const filteredDocuments = useMemo(
    () => filterVehicleDocuments(documents, searchQuery, selectedType),
    [documents, searchQuery, selectedType]
  );

  const pickDocument = async () => {
    setSubmitError(null);

    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: ['application/pdf', 'image/jpeg', 'image/png', 'image/heic', 'image/heif'],
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];

    if (!isSupportedDocumentAsset(asset)) {
      setSubmitError('Unsupported file type. Use PDF, JPG, PNG, or HEIC.');
      return;
    }

    setSelectedFile(asset);
  };

  const handleUploadDocument = async () => {
    if (!user || !vehicleId) {
      return;
    }

    if (!title.trim()) {
      setSubmitError('Title is required.');
      return;
    }

    if (!selectedFile) {
      setSubmitError('Please select a document to upload.');
      return;
    }

    if (documentDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(documentDate.trim())) {
      setSubmitError('Date must use YYYY-MM-DD format.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const uploadResult = await uploadVehicleDocumentFile(user.id, vehicleId, selectedFile);

    if (uploadResult.error || !uploadResult.data) {
      setSubmitError(uploadResult.error?.message ?? 'Unable to upload document file.');
      setIsSubmitting(false);
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const createResult = await createVehicleDocument(user.id, vehicleId, {
      document_type: newDocumentType,
      title,
      description,
      document_date: documentDate,
      tags,
      file_name: uploadResult.data.fileName,
      file_ext: uploadResult.data.fileExt,
      mime_type: uploadResult.data.mimeType,
      file_size_bytes: uploadResult.data.fileSizeBytes,
      storage_bucket: uploadResult.data.bucket,
      storage_path: uploadResult.data.path,
      file_url: uploadResult.data.url,
      uploaded_by: user.email ?? user.id,
    });

    if (createResult.error || !createResult.data) {
      await deleteVehicleDocumentFile(uploadResult.data.path);
      setSubmitError(createResult.error?.message ?? 'Unable to save document metadata.');
      setIsSubmitting(false);
      return;
    }

    setTitle('');
    setDescription('');
    setDocumentDate(todayIsoDate());
    setTagsInput('');
    setSelectedFile(null);
    await loadDocuments();
    setIsSubmitting(false);
  };

  const openExternalUrl = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      setSubmitError('Unable to open this file on the current device.');
      return;
    }

    await Linking.openURL(url);
  };

  const handleDeleteDocument = (documentId: string, storagePath: string) => {
    if (!user || !vehicleId) {
      return;
    }

    Alert.alert('Delete document', 'This will remove the document from this vehicle.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setDeletingDocumentId(documentId);
          const deleteResult = await deleteVehicleDocument(user.id, vehicleId, documentId);

          if (deleteResult.error) {
            setSubmitError(deleteResult.error.message);
            setDeletingDocumentId(null);
            return;
          }

          await deleteVehicleDocumentFile(storagePath);
          await loadDocuments();
          setDeletingDocumentId(null);
        },
      },
    ]);
  };

  if (isLoading || isLoadingDocuments) {
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
      <VehicleWorkspaceHeader
        vehicleId={vehicleId}
        title={vehicleTitle}
        subtitle={vehicleSubtitle}
        activeSection="documents"
      />

      <Text style={styles.sectionHeader}>Documents</Text>
      <Text style={styles.metaText}>Vehicle: {vehicleTitle}</Text>

      {submitError ? <Text style={styles.errorMessageText}>{submitError}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessageText}>{errorMessage}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upload Document</Text>

        <Text style={styles.label}>Document Type</Text>
        <View style={styles.chipRow}>
          {VEHICLE_DOCUMENT_TYPES.map((documentType) => {
            const isSelected = documentType === newDocumentType;

            return (
              <Pressable
                key={documentType}
                style={[styles.chip, isSelected ? styles.chipActive : null]}
                onPress={() => setNewDocumentType(documentType)}>
                <Text style={[styles.chipText, isSelected ? styles.chipTextActive : null]}>{documentType}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Registration Renewal 2026"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Optional notes"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={documentDate}
          onChangeText={setDocumentDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>Tags (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={tagsInput}
          onChangeText={setTagsInput}
          placeholder="registration, annual, dmv"
          placeholderTextColor="#94A3B8"
        />

        <Pressable style={styles.secondaryButton} onPress={pickDocument}>
          <Text style={styles.secondaryButtonText}>Choose File</Text>
        </Pressable>

        {selectedFile ? (
          <Text style={styles.fileMetaText}>
            Selected: {selectedFile.name} ({formatFileSize(selectedFile.size ?? 0)})
          </Text>
        ) : null}

        <Pressable
          style={[styles.primaryButton, isSubmitting ? styles.primaryButtonDisabled : null]}
          disabled={isSubmitting}
          onPress={handleUploadDocument}>
          <Text style={styles.primaryButtonText}>{isSubmitting ? 'Uploading...' : 'Upload Document'}</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Search</Text>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search title or tags"
          placeholderTextColor="#94A3B8"
        />

        <View style={styles.chipRow}>
          {SEARCH_FILTER_TYPES.map((typeOption) => {
            const isSelected = selectedType === typeOption;

            return (
              <Pressable
                key={typeOption}
                style={[styles.chip, isSelected ? styles.chipActive : null]}
                onPress={() => setSelectedType(typeOption)}>
                <Text style={[styles.chipText, isSelected ? styles.chipTextActive : null]}>{typeOption}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {filteredDocuments.length ? (
        <View style={styles.listWrap}>
          {filteredDocuments.map((document) => (
            <View key={document.id} style={styles.documentCard}>
              <Text style={styles.documentTitle}>{document.title}</Text>
              <Text style={styles.documentMeta}>Type: {document.document_type}</Text>
              <Text style={styles.documentMeta}>Date: {document.document_date ?? '—'}</Text>
              <Text style={styles.documentMeta}>Tags: {document.tags.length ? document.tags.join(', ') : '—'}</Text>
              <Text style={styles.documentMeta}>File Size: {formatFileSize(document.file_size_bytes)}</Text>
              <Text style={styles.documentMeta}>Uploaded By: {document.uploaded_by}</Text>
              {document.description ? <Text style={styles.documentDescription}>{document.description}</Text> : null}

              <View style={styles.actionRow}>
                <Pressable style={styles.actionButton} onPress={() => openExternalUrl(document.file_url)}>
                  <Text style={styles.actionButtonText}>View</Text>
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => openExternalUrl(buildVehicleDocumentDownloadUrl(document.file_url, document.file_name))}>
                  <Text style={styles.actionButtonText}>Download</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteDocument(document.id, document.storage_path)}
                  disabled={deletingDocumentId === document.id}>
                  <Text style={styles.actionButtonText}>{deletingDocumentId === document.id ? 'Deleting...' : 'Delete'}</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No documents found</Text>
          <Text style={styles.emptyText}>Upload a document or adjust your search filters.</Text>
        </View>
      )}
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
    gap: 12,
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
  },
  metaText: {
    color: '#94A3B8',
    marginBottom: 2,
  },
  errorMessageText: {
    color: '#FCA5A5',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    gap: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  label: {
    color: '#E2E8F0',
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 10,
    backgroundColor: '#0B1220',
    color: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0B1220',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: '#2563EB',
    backgroundColor: '#1D4ED8',
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderRadius: 10,
    backgroundColor: '#334155',
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontWeight: '700',
  },
  fileMetaText: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  primaryButton: {
    borderRadius: 10,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listWrap: {
    gap: 10,
  },
  documentCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    gap: 4,
  },
  documentTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  documentMeta: {
    color: '#CBD5E1',
    fontSize: 13,
  },
  documentDescription: {
    color: '#E2E8F0',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1E3A8A',
  },
  deleteButton: {
    borderColor: '#DC2626',
    backgroundColor: '#7F1D1D',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
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
