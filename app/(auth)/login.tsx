import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useAuth } from '@/hooks';

export default function LoginScreen() {
  const { signIn, configurationError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(configurationError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(configurationError);

    const { error } = await signIn({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WRNC</Text>
      <Text style={styles.subtitle}>Sign in to Mission Control</Text>

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

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable style={styles.primaryButton} disabled={isSubmitting} onPress={onSubmit}>
        <Text style={styles.primaryButtonText}>{isSubmitting ? 'Signing in...' : 'Sign In'}</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Create account</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/forgot-password')}>
        <Text style={styles.linkText}>Forgot password?</Text>
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
    fontSize: 34,
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
  errorText: {
    color: '#F87171',
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
