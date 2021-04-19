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

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const usernameInput = React.useRef();
  const [telephoneNo, setTelephoneNo] = useState('');
  const phoneInput = React.useRef();
  const [password, setPassword] = useState('');
  const passwordInput = React.useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordInput = React.useRef();
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignUp = (event) => {
    event.preventDefault();
    if (validate()) {
      signUpUser(username, password, telephoneNo);
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!username.trim()) {
      isValid = false;
      errors['username'] = 'Required*';
    }

    if (username.trim() && typeof username !== 'undefined') {
      if (username.length < 8) {
        isValid = false;
        errors['username'] = 'Must have minimum 8 characters length';
      }
    }

    if (!telephoneNo.trim()) {
      isValid = false;
      errors['telephoneNo'] = 'Required*';
    }

    if (telephoneNo.trim() && typeof telephoneNo !== 'undefined') {
      const validNo = phoneInput.current?.isValidNumber(telephoneNo);
      if (!validNo) {
        isValid = false;
        errors['telephoneNo'] = 'Invalid telephone number';
      }
    }

    if (!password.trim()) {
      isValid = false;
      errors['password'] = 'Required*';
    }

    if (!confirmPassword.trim()) {
      isValid = false;
      errors['confirmPassword'] = 'Required*';
    }

    if (password.trim() && typeof password !== 'undefined') {
      if (password.length < 8) {
        isValid = false;
        errors['password'] = 'Must have minimum 8 characters length';
      }
    }

    if (typeof password !== 'undefined' && typeof confirmPassword !== 'undefined') {
      if (password != confirmPassword) {
        isValid = false;
        errors['password'] = 'Password doesn\'t match with confirm password';
      }
    }

    if (agree != true) {
      isValid = false;
      errors['agree'] = 'The terms must be accepted to proceed';
    }

    setErrors(errors);
    return isValid;
  }

  function signUpUser(username, password, telephoneNo) {
    const url = 'http://18.221.60.193/register';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        contact: telephoneNo,
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
          usernameInput.current.clear();
          passwordInput.current.clear();
          confirmPasswordInput.current.clear();
          setAgree(false);
          navigation.navigate('Verify Device', { username: Jsonresponse.username });
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

      <Text style={styles.title}>Sign up</Text>

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
        <PhoneInput
          style={styles.textInput}
          ref={phoneInput}
          placeholder='Telephone No'
          defaultCode='LK'
          onChangeText={(telephoneNo) => setTelephoneNo(telephoneNo)}
        />
        <Text style={styles.errors}>{errors.telephoneNo}</Text>
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={confirmPasswordInput}
          placeholder='Confirm Password'
          placeholderTextColor='#666666'
          secureTextEntry={true}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
        <Text style={styles.errors}>{errors.confirmPassword}</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkbox}
          value={agree}
          onValueChange={(agree) => setAgree(agree)}
          tintColors={{ true: '#35BEE0', false: 'black' }}
        />
        <Text style={styles.checkboxLabel}>I agree with terms of use and privacy</Text>
      </View>
      <Text style={styles.errors}>{errors.agree}</Text>

      <TouchableOpacity style={styles.signUp}>
        <Text style={styles.signUpText} onPress={(event) => handleSignUp(event)}>Sign up</Text>
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
    paddingBottom: 25,
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

  checkboxContainer: {
    flexDirection: 'row',
  },

  checkbox: {
    alignSelf: 'center',
  },

  checkboxLabel: {
    margin: 8,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#666666',
  },

  signUp: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#35BEE0',
  },

  signUpText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default SignUp;