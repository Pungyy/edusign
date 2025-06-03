import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-ios-kit';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('Succès', 'Compte créé. Vérifie ton mail.');
      router.push('/(auth)/login');
    }
  }

  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>Inscription</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        clearButtonMode="while-editing"
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        clearButtonMode="while-editing"
      />

      <Button
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        S’inscrire
      </Button>

      <Button
        variant="link"
        onPress={() => router.push('/(auth)/login')}
        style={styles.link}
      >
        Déjà un compte ? Connecte-toi
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 30,
    textAlign: 'center',
  },
});
