import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useAuth } from '@/hooks';

export default function RegisterScreen() {
  const { register, configurationError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(configurationError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setFeedbackMessage(configurationError);

    const { error } = await register({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setFeedbackMessage(error);
      return;
    }

    setFeedbackMessage('Account created. Check your email to confirm your account.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Register to access WRNC Mission Control.</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#64748B"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor="#64748B"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {feedbackMessage ? <Text style={styles.feedbackText}>{feedbackMessage}</Text> : null}

      <Pressable style={styles.primaryButton} disabled={isSubmitting} onPress={onSubmit}>
        <Text style={styles.primaryButtonText}>{isSubmitting ? 'Creating...' : 'Create Account'}</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/login')}>
        <Text style={styles.linkText}>Back to sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    backgroundColor: '#1E293B',
  },
  feedbackText: {
    color: '#E2E8F0',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  linkText: {
    color: '#93C5FD',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
});
