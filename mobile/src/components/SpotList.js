import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import api from './../services/api';

function SpotList({ tech, navigation }) {

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const loadSpots = async () => {
      const res = await api.get('/spots', {
        params: { tech }
      });

      setSpots(res.data);
    };

    loadSpots();
  }, []);

  const handleNavigate = id => {
    navigation.navigate('Book', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
      <FlatList 
        style={styles.list}
        data={spots}
        keyExtrator={item => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{uri: item.thumbnail_url.replace('localhost', '192.168.0.105') }} style={styles.thumbnail}/>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}        
      />
    </View>
  );
}

const styles = StyleSheet.create({ 

  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#f1f1f1',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0548d'
  },
  price: {
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default withNavigation(SpotList);