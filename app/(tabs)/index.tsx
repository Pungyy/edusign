import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../../lib/supabase';

type Salle = {
  id: string;
  nom: string;
  capacite: number;
  batiment: string;
};

export default function Home() {
  const router = useRouter();

  const [salles, setSalles] = useState<Salle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalles = async () => {
      const { data, error } = await supabase.from('salles').select('*');
      if (error) {
        setError(error.message);
        setSalles([]);
      } else {
        setSalles(data as Salle[]);
      }
      setLoading(false);
    };
    fetchSalles();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: 'red' }}>Erreur : {error}</Text>
        <Button title="Déconnexion" onPress={handleLogout} color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Edusign !</Text>
      
      <FlatList
        data={salles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.salleCard}
            onPress={() => router.push(`/scanner?salleId=${item.id}`)}
          >
            <Text style={styles.salleNom}>{item.nom}</Text>
            <Text>Capacité : {item.capacite}</Text>
            <Text>Bâtiment : {item.batiment}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Aucune salle disponible</Text>}
        style={{ marginBottom: 20 }}
      />

      <Button title="Déconnexion" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  salleCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  salleNom: {
    fontSize: 18,
    fontWeight: '600',
  },
});
