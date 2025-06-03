import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text>Demande d'accès caméra...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Pas d'accès à la caméra</Text>
        <Button title="Autoriser" onPress={requestPermission} />
      </View>
    );
  }

  function toggleCamera() {
    setFacing((f) => (f === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleCamera} style={styles.button}>
            <Text style={styles.text}>Changer caméra</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  text: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
