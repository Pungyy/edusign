import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Edusign !</Text>
      <Button title="Scanner un QR code" onPress={() => router.push('/scanner')} />
      <Button title="Déconnexion" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding: 20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom: 20, textAlign:'center' },
});
