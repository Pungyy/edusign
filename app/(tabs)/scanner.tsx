import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Scanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner de QR Code</Text>
      {/* Ici tu ajouteras ton composant caméra/QR */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
});
