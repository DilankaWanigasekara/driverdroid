import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';

const About = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style='auto' />

        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />

          <Text style={styles.headerText}>Driverdroid</Text>

          <Text style={styles.text}>Driverdroid is a Driver Drowsiness Detection System which is designed and developed by group of undergraduate students of
          Informatics Institute of Technology affiliated with the University of Westminster.{'\n\n'}
          The aim of this project is to develop a system to detect driver drowsiness by using an IoT device and to alert the driver about his fatigue.
          By doing so, the developers willing to contribute to reduce the number of accidents which happen due to drowsy drivers.</Text>
        </View>

        <View>
          <Text style={styles.findOutText}>Find out more about us on : </Text>

          {/* navigate to social media sites*/}
          <View style={styles.socialMediaIconContainer}>
            <SocialIcon
              type='facebook'
              onPress={() => {
                Linking.canOpenURL('https://www.facebook.com/').then(supported => {
                  if (supported) {
                    Linking.openURL('https://www.facebook.com/');
                  } else {
                    alert('Sorry! we can\'t connect to Facebook right now')
                  }
                })
              }}
            />

            <SocialIcon
              type='twitter'
              onPress={() => {
                Linking.canOpenURL('https://twitter.com/LOGIN').then(supported => {
                  if (supported) {
                    Linking.openURL('https://twitter.com/LOGIN');
                  } else {
                    alert('Sorry! we can\'t connect to Twitter right now')
                  }
                })
              }}
            />

            <SocialIcon
              type='instagram'
              onPress={() => {
                Linking.canOpenURL('https://www.instagram.com/accounts/login/').then(supported => {
                  if (supported) {
                    Linking.openURL('https://www.instagram.com/accounts/login/');
                  } else {
                    alert('Sorry! we can\'t connect to Instagram right now')
                  }
                })
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    paddingTop: 20,
  },

  container: {
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 220,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  imageContainer: {
    backgroundColor: '#EEEEF8',
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  headerText: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: '#39504A',
    textAlign: 'center',
  },

  text: {
    marginRight: 12,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#39504A',
    textAlign: 'center',
  },

  findOutText: {
    color: '#39504A',
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 25,
  },

  socialMediaIconContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
});

export default About;