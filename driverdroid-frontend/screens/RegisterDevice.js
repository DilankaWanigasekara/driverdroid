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

const Register = ({ navigation }) => {
  const [verifyCode, setVerifyCode] = useState('');
  const verifyCodeInput = React.useRef();
  const [errors, setErrors] = useState({});

  const handleRegisterDevice = (event) => {
    event.preventDefault();

    if (validate()) {
      verifyCodeInput.current.clear();
      navigation.navigate('Home');
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!verifyCode.trim()) {
      isValid = false;
      errors['verifyCode'] = 'Required*';
    }

    if (verifyCode.trim() && typeof verifyCode !== 'undefined') {
      if (verifyCode.length != 6) {
        isValid = false;
        errors['verifyCode'] = 'Invalid verification code';
      }
    }

    setErrors(errors);
    return isValid;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />

      <Text style={styles.text}>Please enter the verification code{'\n'}we had sent to your device</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={verifyCodeInput}
          placeholder='Verification Code'
          placeholderTextColor='#666666'
          onChangeText={(verifyCode) => setVerifyCode(verifyCode)}
        />
        <Text style={styles.errors}>{errors.verifyCode}</Text>
      </View>

      <TouchableOpacity style={styles.register}>
        <Text style={styles.registerText} onPress={(event) => handleRegisterDevice(event)}>Register Device</Text>
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

  text: {
    paddingTop: 30,
    paddingBottom: 30,
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

  register: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#35BEE0',
  },

  registerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default Register;