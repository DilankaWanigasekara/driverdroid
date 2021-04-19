import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const usernameInput = React.useRef();
  const [errors, setErrors] = useState({});

  const handleForgotPassword = (event) => {
    event.preventDefault();
    if (validate()) {
      getTempPassword(username);
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!username.trim()) {
      isValid = false;
      errors['username'] = 'Required*';
    }

    setErrors(errors);
    return isValid;
  }

  function getTempPassword(username) {
    const url = 'http://18.221.60.193/forget-password';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, Jsonresponse]) => {
        if (status != 200) {
          alert(Jsonresponse.message);
        } else {
          alert('We sent a temporary password to your registered phone number');
          usernameInput.current.clear();
          navigation.navigate('Reset Password', { username: username });
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

      <Text style={styles.title}>Forgot Your{"\n"}Password?</Text>

      <Text style={styles.text}>No worries!{"\n"}We will send you a temporary password{"\n"}to your registered phone number</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={usernameInput}
          placeholder='Username'
          placeholderTextColor='#666666'
          onChangeText={(username) => setUsername(username)}
        />
        <Text style={styles.errors}>{errors.username}</Text>
      </View>

      <TouchableOpacity style={styles.getTempPassword}>
        <Text style={styles.getTempPasswordText} onPress={(event) => handleForgotPassword(event)}>Get Temporary Password</Text>
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

  title: {
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 42,
    fontFamily: 'OpenSans-Bold',
    color: '#59499E',
    textAlign: 'center',
  },

  text: {
    paddingBottom: 20,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#39504A',
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

  getTempPassword: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#35BEE0',
  },

  getTempPasswordText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default ForgotPassword;