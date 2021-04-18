import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = () => {
  const [name, setName] = useState('');
  const nameInput = React.useRef();
  const [email, setEmail] = useState('');
  const emailInput = React.useRef();
  const [message, setMessage] = useState('');
  const messageInput = React.useRef();
  const [errors, setErrors] = useState({});
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

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      let data = (jsonValue != null ? JSON.parse(jsonValue) : null);
      setUserToken(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getUserData() {
    const url = 'http://142.93.254.255:8080/me';
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
          getData();
          if (userData != null) {
            signInUser(userData.username, userData.password);
          }
        } else {
          storeData(Jsonresponse);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred!')
      });
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(DATA_STORAGE_KEY);
      let data = (jsonValue != null ? JSON.parse(jsonValue) : null);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(DATA_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  function signInUser(username, password) {
    const url = 'http://142.93.254.255:8080/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, Jsonresponse]) => {
        if (status != 200) {
          console.log('Error occurred while trying to login user');
        } else {
          storeToken(Jsonresponse);
          setUserToken(Jsonresponse);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred!')
      });
  }

  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  const handleContactUs = (event) => {
    event.preventDefault();
    if (validate()) {
      if (userToken != null) {
        contact(name, email, message);
      } else {
        alert('Error occurred while trying to send your message. Please try again later');
      }
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!name.trim()) {
      isValid = false;
      errors['name'] = 'Required*';
    }

    if (!email.trim()) {
      isValid = false;
      errors['email'] = 'Required*';
    }

    if (email.trim() && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) == false) {
      isValid = false;
      errors['email'] = 'Invalid email address';
    }

    if (!message.trim()) {
      isValid = false;
      errors['message'] = 'Required*';
    }

    setErrors(errors);
    return isValid;
  }

  function contact(name, email, message) {
    const url = 'http://142.93.254.255:8080/api/contact';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken.token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
      .then((response) => {
        const statusCode = response.status;
        return Promise.all([statusCode]);
      })
      .then(([status]) => {
        if (status != 200) {
          alert('Error occurred while trying to send your message. Please try again later');
        } else {
          alert('Successfully sent your message! Thanks for being with driverdroid');
          nameInput.current.clear();
          emailInput.current.clear();
          messageInput.current.clear();
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

      <Text style={styles.title}>Get In Touch</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={nameInput}
          placeholder='Your name'
          placeholderTextColor='#666666'
          onChangeText={(name) => setName(name)}
        />
        <Text style={styles.errors}>{errors.name}</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={emailInput}
          keyboardType={'email-address'}
          placeholder='Your email'
          placeholderTextColor='#666666'
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={styles.errors}>{errors.email}</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={messageInput}
          multiline={true}
          placeholder='Write your message here'
          placeholderTextColor='#666666'
          onChangeText={(message) => setMessage(message)}
        />
        <Text style={styles.errors}>{errors.message}</Text>
      </View>

      <TouchableOpacity style={styles.sendMessage}>
        <Text style={styles.sendMessageText} onPress={(event) => handleContactUs(event)}>Send Message</Text>
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
    paddingBottom: 30,
    fontSize: 42,
    fontFamily: 'OpenSans-Bold',
    color: '#59499E',
  },

  inputView: {
    backgroundColor: '#EEEEF8',
    borderRadius: 6,
    width: '80%',
    minHeight: 45,
    maxHeight: 200,
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

  sendMessage: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#35BEE0',
  },

  sendMessageText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default ContactUs;