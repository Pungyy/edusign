import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { Button, Title1 } from 'react-native-ios-kit'; // import composants spécifiques
import { supabase } from '../../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <View style={styles.container}>
      <Title1 style={styles.title}>Connexion</Title1>

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
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.link}
      >
        Se connecter
      </Button>

      <Button
        variant="link"
        onPress={() => router.push('/(auth)/signup')}
        style={styles.link}
      >
        Pas de compte ? Inscris-toi
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
    alignItems: 'center', // <-- Centre les enfants horizontalement
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 5,
    width: '100%', // <-- Pour que l'input occupe toute la largeur dispo
  },
  button: {
    marginTop: 10,
    width: '100%', // <-- Optionnel si tu veux que le bouton prenne toute la largeur aussi
  },
  link: {
    marginTop: 30,
    textAlign: 'center',
  },
});
