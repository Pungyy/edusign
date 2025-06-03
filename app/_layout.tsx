import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const isLoggedIn = !!session;
      const inAuthGroup = segments[0] === '(auth)';

      if (!isLoggedIn && !inAuthGroup) {
        router.replace('/(auth)/login');
      }

      if (isLoggedIn && inAuthGroup) {
        router.replace('/(tabs)');
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      const isLoggedIn = !!data.session;
      const inAuthGroup = segments[0] === '(auth)';

      if (!isLoggedIn && !inAuthGroup) {
        router.replace('/(auth)/login');
      }

      if (isLoggedIn && inAuthGroup) {
        router.replace('/(tabs)');
      }

      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [segments]);

  if (loading) return <Text style={{ marginTop: 50, textAlign: 'center' }}>Chargement…</Text>;

  return <Slot />;
}
