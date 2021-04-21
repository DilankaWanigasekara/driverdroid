import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverHistory = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [lastTripDate, setLastTripDate] = useState(null);
  const [lastTripTime, setLastTripTime] = useState(null);
  const [lastTripLocation, setLastTripLocation] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const TOKEN_STORAGE_KEY = '@user_token';
  const DATA_STORAGE_KEY = '@user_data';

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        getToken();
      })();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        if (userToken != null) {
          if (userToken.token != null) {
            getUserData();
          }
        }
      })();
    }, [userToken])
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        if (userToken != null) {
          if (userToken.token != null) {
            if (userData != null) {
              getHistoryData();
            }
          }
        }
      })();
    }, [userData])
  );

  //get user token from the async storage
  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      let data = (jsonValue != null ? JSON.parse(jsonValue) : null);
      setUserToken(data);
    } catch (error) {
      console.log(error);
    }
  }

  //call backend API to get current user details
  function getUserData() {
    const url = 'http://18.221.60.193/me';
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken.token,
      }
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, Jsonresponse]) => {
        if (status != 200) { //navigate user to the sign in page if user token has expires
          alert('We need to verify it\'s you! You\'ll be redirected to the sign in page soon');
          navigation.navigate('Sign In');
        } else {
          storeData(Jsonresponse);
          setUserData(Jsonresponse);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred!')
      });
  }

  //store retrieved user data to the async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(DATA_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  //get drowsiness warnings history details of the user from the server
  function getHistoryData() {
    const url = `http://18.221.60.193/api/get-statistics?id=${userData.id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken.token,
      }
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, Jsonresponse]) => {
        if (status != 200) {
          alert('Error occurred while trying to get history data. Please try again later');
        } else if (Jsonresponse.length != 0) {
          const sortedResponse = Jsonresponse.sort(function (a, b) { //sort history data according to the warned date
            return new Date(b.dateTime) - new Date(a.dateTime);
          });
          setHistoryData(sortedResponse);
          let lastTrip = sortedResponse[0]; //get latest drowsiness warning details of the user
          let lastTripDate = lastTrip.dateTime.substring(0, 10); //extract last warning date
          let lastTripTime = lastTrip.dateTime.substring(11, 19); //extract last warning time
          let lastTripLocation = lastTrip.location; //extract last warning location
          setLastTripDate(lastTripDate);
          setLastTripTime(lastTripTime);
          setLastTripLocation(lastTripLocation);
        } else if (Jsonresponse.length == 0) {
          alert('No drowsiness warnings has given to you during last month')
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred!')
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <View style={styles.imageContainer}>
        <Text style={styles.text}>Your latest drowsiness warning</Text>

        <Image style={styles.image} source={require('../assets/images/driver_history_image.jpeg')} />

        <View style={styles.detailsContainer}>
          <Icon
            raised
            reverse
            name='calendar'
            type='font-awesome'
            color='#59499E'
            size={18} />

          <Text style={styles.detailText}>Trip Date & Time : {(lastTripDate != null && lastTripTime != null) && (lastTripDate + ", " + lastTripTime)}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Icon style
            raised
            reverse
            name='map-marker'
            type='font-awesome'
            color='#59499E'
            size={18} />

          <Text style={styles.detailText}>Location : {(lastTripLocation != null) && lastTripLocation}</Text>
        </View>

        <TouchableOpacity style={styles.findMore}>
          <Text style={styles.findMoreText} 
            onPress={() => { (historyData.length != 0) ? navigation.navigate('Driver History Statistics', { historyData: historyData }) : alert('No drowsiness warnings has given to you during last month. Thererfore no data to show!') }}>Find Out More</Text>
        </TouchableOpacity>
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
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },

  text: {
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    color: '#39504A',
    textAlign: 'center',
  },

  image: {
    width: 300,
    height: '50%',
    marginLeft: 8,
    marginRight: 8,
    alignSelf: 'center',
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  detailText: {
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#39504A',
    textAlign: 'center',
  },

  findMore: {
    width: 280,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#35BEE0',
  },

  findMoreText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default DriverHistory;