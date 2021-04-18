import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const usernameInput = React.useRef();
  const [password, setPassword] = useState('');
  const passwordInput = React.useRef();
  const [errors, setErrors] = useState({});
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const TOKEN_STORAGE_KEY = '@user_token';
  const DATA_STORAGE_KEY = '@user_data';

  useEffect(() => {
    (async () => {
      getToken();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userToken != null) {
        if (userToken.token != null) {
          getUserData();
        }
      }
    })();
  }, [userToken]);

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
          navigation.navigate('Home');
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

  const handleSignIn = (event) => {
    event.preventDefault();
    if (validate()) {
      signInUser(username, password);
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!username.trim()) {
      isValid = false;
      errors['username'] = 'Required*';
    }

    if (!password.trim()) {
      isValid = false;
      errors['password'] = 'Required*';
    }

    setErrors(errors);
    return isValid;
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
          alert('No user account exist with provided username & password!');
        } else {
          storeToken(Jsonresponse);
          usernameInput.current.clear();
          passwordInput.current.clear();
          navigation.navigate('Home');
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

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />

      <Text style={styles.title}>Sign in</Text>

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

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={passwordInput}
          placeholder='Password'
          placeholderTextColor='#666666'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Text style={styles.errors}>{errors.password}</Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword} onPress={() => navigation.navigate('Forgot Password')}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signUp} onPress={() => navigation.navigate('Sign Up')}>New user? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signIn}>
        <Text style={styles.signInText} onPress={(event) => handleSignIn(event)}>Sign in</Text>
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
  },

  inputView: {
    backgroundColor: '#EEEEF8',
    borderRadius: 6,
    width: '80%',
    height: 45,
    marginBottom: 35,
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

  forgotPassword: {
    marginBottom: 20,
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#666666',
  },

  signUp: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#666666',
  },

  signIn: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#35BEE0',
  },

  signInText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default SignIn;