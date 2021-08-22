import React, {useState, useEffect} from 'react';
import 
{ 
  View,
  AsyncStorage, 
  KeyboardAvoidingView, 
  Image, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Platform
} 
from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) navigation.navigate('List');
    });

  }, []);

  const handleSubmit = async () => {
    //email, techs
    const res = await api.post('/sessions', () => {
      email
    });

    const { _id } = res.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');

  };

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Seu e-mail" 
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}

          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Tecnologias de interesse" 
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}

          value={techs}
          onChangeText={setTechs} // equivalente a {text => setTechs(text)}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30

  },
  label: {
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
  }
});