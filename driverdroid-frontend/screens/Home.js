import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <View style={styles.imageContainer}>
        <Text style={styles.text}>Feeling drowsy?{'\n'}Park and rest</Text>

        <Image style={styles.image} source={require('../assets/images/home_image.jpeg')} />

        <Text style={styles.text}>YOUR DESICIONS{'\n'}DRIVE YOUR SAFETY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    backgroundColor: '#EEEEF8',
    marginLeft: 20,
    marginRight: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },

  text: {
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'OpenSans-SemiBold',
    color: '#39504A',
    textAlign: 'center',
  },

  image: {
    width: 360,
    height: '50%',
    marginLeft: 8,
    marginRight: 8,
    alignSelf: 'center',
  },
});

export default Home;