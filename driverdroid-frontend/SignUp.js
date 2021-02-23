import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [telephoneNo, setTelephoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  
  return (
    <View style = {styles.container}>
      <StatusBar style = 'auto' />
      
      <Text style = {styles.title}>Sign up</Text>

      <View style = {styles.inputView}>
        <TextInput
          style = {styles.textInput}
          placeholder = 'Username'
          placeholderTextColor = '#666666'
          onChangeText = {(username) => setUsername(username)}
        />
      </View>

      <View style = {styles.inputView}>
        <PhoneInput 
          style = {styles.textInput}
          placeholder = 'Telephone No'
          defaultCode = 'LK'
          onChangeText = {(telephoneNo) => setTelephoneNo(telephoneNo)}
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

      <View style = {styles.inputView}>
        <TextInput
          style = {styles.textInput}
          placeholder = 'Confirm Password'
          placeholderTextColor = '#666666'
          secureTextEntry = {true}
          onChangeText = {(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
      </View>

      <View style = {styles.checkboxContainer}>
        <CheckBox
          style = {styles.checkbox}
          value = {agree}
          onValueChange = {setAgree}
        />
        <Text style = {styles.checkboxLabel}>I agree with terms of use and privacy</Text>
      </View>

      <TouchableOpacity style = {styles.signUp} disabled = {!agree}>
        <Text style = {styles.signUpText} onPress = {() => navigation.navigate('VerifyDevice')}>Sign up</Text>
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
    flex : 1,
    padding : 10,
    fontSize : 14,
    fontFamily : 'OpenSans-SemiBold',
    color : '#666666',
  },

  checkboxContainer : {
    flexDirection : 'row',
  },

  checkbox : {
    alignSelf: 'center',
  },

  checkboxLabel : {
    margin: 8,
    fontSize : 14,
    fontFamily : 'OpenSans-SemiBold',
    color : '#666666',
  },

  signUp : {
    width : '80%',
    borderRadius : 8,
    height : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 40,
    backgroundColor : '#35BEE0',
  },

  signUpText : {
    color : 'white',
    fontSize : 20,
    fontFamily : 'OpenSans-Bold',
  },
});

export default SignUp;