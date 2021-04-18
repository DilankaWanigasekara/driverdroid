import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const Verify = ({ navigation }) => {
  const [deviceID, setDeviceID] = useState('');
  const deviceIDInput = React.useRef();
  const [errors, setErrors] = useState({});

  const handleVerifyDevice = (event) => {
    event.preventDefault();

    if (validate()) {
      deviceIDInput.current.clear();
      navigation.navigate('Register Device');
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!deviceID.trim()) {
      isValid = false;
      errors['deviceID'] = 'Required*';
    }

    if (deviceID.trim() && typeof deviceID !== 'undefined') {
      if (deviceID.length != 6) {
        isValid = false;
        errors['deviceID'] = 'Invalid device ID';
      }
    }

    setErrors(errors);
    return isValid;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />

      <Text style={styles.title}>Register your{'\n'}device here</Text>

      <Text style={styles.text}>Please enter the device Id{'\n'}provided in your device</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={deviceIDInput}
          placeholder='Device ID'
          placeholderTextColor='#666666'
          onChangeText={(deviceID) => setDeviceID(deviceID)}
        />
        <Text style={styles.errors}>{errors.deviceID}</Text>
      </View>

      <TouchableOpacity style={styles.verify}>
        <Text style={styles.verifyText} onPress={(event) => handleVerifyDevice(event)}>Verify Device</Text>
      </TouchableOpacity>
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

  logo: {
    width: 220,
    height: 150,
  },

  title: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 42,
    fontFamily: 'OpenSans-Bold',
    color: '#59499E',
    textAlign: 'center',
  },

  text: {
    paddingBottom: 20,
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#666666',
    textAlign: 'center',
  },

  inputView: {
    backgroundColor: '#EEEEF8',
    borderRadius: 6,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },

  textInput: {
    padding: 10,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#666666',
  },

  errors: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#35BEE0',
  },

  verify: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#35BEE0',
  },

  verifyText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default Verify;