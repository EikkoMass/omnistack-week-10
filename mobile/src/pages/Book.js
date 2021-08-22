import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet, AsyncStorage, View, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date,
    },
      {
        headers: { user_id },
      });


    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  };

  const handleCancel = () => {
    navigation.navigate('List');
  };

  return (
    <View style={styles.main}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}

      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </View>
    )}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#2d2d2d',
    height: '100%',
    width: '100%',
  },
  container: {
    margin: 30,
    marginTop: 50,
  },
  label: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#DDD',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
  }
});