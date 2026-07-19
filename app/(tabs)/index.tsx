import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/hooks';
import {
  createUserGarage,
  deleteUserGarage,
  listUserGarages,
  updateUserGarage,
} from '@/services/api';
import { Garage } from '@/types';

export default function MissionControlScreen() {
  const { user, signOut } = useAuth();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingGarageId, setEditingGarageId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const loadGarages = useCallback(async () => {
    if (!user) {
      setGarages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await listUserGarages(user.id);

    if (error) {
      setFeedbackMessage(error.message);
      setIsLoading(false);
      return;
    }

    setFeedbackMessage(null);
    setGarages(data);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    loadGarages();
  }, [loadGarages]);

  const openCreateGarage = () => {
    setEditingGarageId(null);
    setName('');
    setDescription('');
    setFeedbackMessage(null);
    setIsFormVisible(true);
  };

  const openEditGarage = (garage: Garage) => {
    setEditingGarageId(garage.id);
    setName(garage.name);
    setDescription(garage.description ?? '');
    setFeedbackMessage(null);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingGarageId(null);
    setName('');
    setDescription('');
  };

  const submitGarage = async () => {
    if (!user) {
      return;
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      setFeedbackMessage('Garage name is required.');
      return;
    }

    setIsSubmitting(true);

    if (editingGarageId) {
      const { data, error } = await updateUserGarage(user.id, editingGarageId, {
        name: normalizedName,
        description,
      });

      if (error || !data) {
        setFeedbackMessage(error?.message ?? 'Unable to update garage.');
        setIsSubmitting(false);
        return;
      }

      setGarages((current) => current.map((garage) => (garage.id === data.id ? data : garage)));
    } else {
      const { data, error } = await createUserGarage(user.id, {
        name: normalizedName,
        description,
      });

      if (error || !data) {
        setFeedbackMessage(error?.message ?? 'Unable to create garage.');
        setIsSubmitting(false);
        return;
      }

      setGarages((current) => [data, ...current]);
    }

    setFeedbackMessage(null);
    setIsSubmitting(false);
    closeForm();
  };

  const confirmDeleteGarage = (garage: Garage) => {
    Alert.alert(
      'Delete garage',
      `Delete ${garage.name}? This removes access to this garage from Mission Control.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!user) {
              return;
            }

            const { error } = await deleteUserGarage(user.id, garage.id);
            if (error) {
              setFeedbackMessage(error.message);
              return;
            }

            setGarages((current) => current.filter((item) => item.id !== garage.id));
            setFeedbackMessage(null);
          },
        },
      ]
    );
  };

  const goToGarage = (garageId: string) => {
    router.push({
      pathname: '/garage/[garageId]',
      params: { garageId },
    });
  };

  const onSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      setFeedbackMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>WRNC</Text>
          <Text style={styles.subtitle}>Mission Control</Text>
        </View>
        <Pressable style={styles.secondaryButton} onPress={onSignOut}>
          <Text style={styles.secondaryButtonText}>Sign Out</Text>
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>My Garages</Text>
        <Text style={styles.summaryValue}>{garages.length}</Text>
      </View>

      {feedbackMessage ? <Text style={styles.feedbackText}>{feedbackMessage}</Text> : null}

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#93C5FD" />
        </View>
      ) : (
        <FlatList
          data={garages}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyStateCard}>
              <Text style={styles.emptyStateTitle}>No garages yet</Text>
              <Text style={styles.emptyStateText}>Create your first garage to get started.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.garageCard}>
              <Pressable onPress={() => goToGarage(item.id)}>
                <Text style={styles.garageName}>{item.name}</Text>
                {item.description ? <Text style={styles.garageDescription}>{item.description}</Text> : null}
                <Text style={styles.garageLink}>Open Garage</Text>
              </Pressable>
              <View style={styles.cardActionsRow}>
                <Pressable style={styles.inlineAction} onPress={() => openEditGarage(item)}>
                  <Text style={styles.inlineActionText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={[styles.inlineAction, styles.destructiveAction]}
                  onPress={() => confirmDeleteGarage(item)}>
                  <Text style={styles.inlineActionText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}

      <Pressable style={styles.primaryButton} onPress={openCreateGarage}>
        <Text style={styles.primaryButtonText}>+ Create Garage</Text>
      </Pressable>

      {isFormVisible ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{editingGarageId ? 'Edit Garage' : 'Create Garage'}</Text>
          <TextInput
            placeholder="Garage name"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor="#64748B"
            style={[styles.input, styles.inputMultiline]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.formActionsRow}>
            <Pressable style={styles.formCancelButton} onPress={closeForm}>
              <Text style={styles.formCancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.formSaveButton} disabled={isSubmitting} onPress={submitGarage}>
              <Text style={styles.formSaveButtonText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  summaryTitle: {
    color: '#CBD5E1',
    fontSize: 15,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  feedbackText: {
    color: '#FCA5A5',
    marginBottom: 10,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    gap: 12,
    paddingBottom: 140,
  },
  emptyStateCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginTop: 4,
  },
  emptyStateTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  emptyStateText: {
    color: '#CBD5E1',
    marginTop: 8,
    fontSize: 15,
  },
  garageCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  garageName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  garageDescription: {
    color: '#CBD5E1',
    fontSize: 15,
    marginTop: 6,
  },
  garageLink: {
    color: '#93C5FD',
    fontWeight: '600',
    marginTop: 10,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 14,
  },
  inlineAction: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  destructiveAction: {
    backgroundColor: '#7F1D1D',
  },
  inlineActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  primaryButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  formCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 90,
    backgroundColor: '#0B1220',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  formTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  formActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  formCancelButton: {
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  formCancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  formSaveButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  formSaveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
