import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Alert, Linking, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

const RestPlaces = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [region, setRegion] = useState(null);
  const [places, setPlaces] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync(); //request location permission from the user
        if (status !== 'granted') {
          Alert.alert(
            'Permission to access location was denied',
            'We want your current location to suggest you rest places. Would you like to give us permission to access your location?',
            [
              {
                text: 'Yes',
                onPress: () => { navigation.navigate('Rest Places') }
              },
              {
                text: 'No',
                onPress: () => { navigation.navigate('Home') }
              },
            ],
            { cancelable: false },
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({}); //get current location of the user
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });

        //get nearby restaurants using google places API
        function getNearbyPlaces() {
          if (latitude != null && longitude != null) {
            const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude
              + '&radius=2000&type=restaurant&key=AIzaSyByamnPPlulIhr_56Qn94KuInBvctHRgMA';
            fetch(url)
              .then((response) => {
                return response.json()
              })
              .then((Jsonresponse) => {
                setPlaces(Jsonresponse.results);
              })
              .catch((error) => {
                console.log(error);
                alert('An error has occurred while trying to find nearby rest places!')
              });
          }
        }
        getNearbyPlaces();
      })();
    }, [latitude, longitude])
  );

  //get directions to the selected rest place with the help of 'google maps' app
  function getDirections(destinationLoc) {
    const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${destinationLoc}`
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('An error occurred while trying to get directions');
      } else {
        return Linking.openURL(url);
      }
    }).catch((error) => {
      console.error(error)
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <MapView
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        initialRegion={region}
      >
        {(latitude != null && longitude != null) &&
          places.map((place, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }}
            >
              <Callout onPress={() => getDirections(place.name)}>
                <Text style={styles.restaurantName}>{place.name}</Text>
                <Text style={styles.restaurantDescription}>A nearby restaurant</Text>
                <TouchableOpacity style={styles.getDirections}>
                  <Text style={styles.getDirectionsText}>Get Directions</Text>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))
        }

        {(latitude != null && longitude != null) &&
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={'Location'}
            description={'Your current location'}
            pinColor='#35BEE0'
          />
        }
      </MapView>
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

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  restaurantName: {
    alignSelf: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    paddingBottom: 3,
  },

  restaurantDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    paddingBottom: 2,
  },

  getDirections: {
    backgroundColor: '#35BEE0',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  getDirectionsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
});

export default RestPlaces;