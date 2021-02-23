import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const SignIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
      <View style = {styles.container}>
        <StatusBar style = 'auto' />
        
        <Text style = {styles.title}>Sign in</Text>
        
        <View style = {styles.inputView}>
          <TextInput
            style = {styles.textInput}
            placeholder = 'Username'
            placeholderTextColor = '#666666'
            onChangeText = {(username) => setUsername(username)}
          />
        </View>

        <View style = {styles.inputView}>
          <TextInput
            style = {styles.textInput}
            placeholder = 'Password'
            placeholderTextColor = '#666666'
            secureTextEntry = {true}
            onChangeText = {(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style = {styles.forgotPassword} onPress = {() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style = {styles.signUp} onPress = {() => navigation.navigate('SignUp')}>New user? Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.signIn}>
          <Text style = {styles.signInText} onPress = {() => navigation.navigate('Home')}>Sign in</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#F8F8FF',
    alignItems : 'center',
    justifyContent : 'center',
  },

  title : {
    height : 100,
    paddingBottom : 10,
    fontSize : 42,
    fontFamily : 'OpenSans-Bold',
    color : '#59499E',
  },

  inputView : {
    backgroundColor : '#EEEEF8',
    borderRadius : 6,
    width : '80%',
    height : 45,
    marginBottom : 20,
  },

  textInput : {
    height : 50,
    padding : 10,
    fontSize : 14,
    fontFamily : 'OpenSans-SemiBold',
    color : '#666666',
  },

  forgotPassword : {
    height : 30,
    marginBottom : 10,
    fontSize : 15,
    fontFamily : 'OpenSans-SemiBold',
    color : '#666666',
  },

  signUp : {
    height : 30,
    marginBottom : 10,
    fontSize : 15,
    fontFamily : 'OpenSans-SemiBold',
    color : '#666666',
  },

  signIn : {
    width : '80%',
    borderRadius : 8,
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 40,
    backgroundColor : '#35BEE0',
  },

  signInText : {
    color : 'white',
    fontSize : 20,
    fontFamily : 'OpenSans-Bold',
  },
});

export default SignIn;