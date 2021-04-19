import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ResetPassword = ({ route, navigation }) => {
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const tempPasswordInput = React.useRef();
  const [newPassword, setNewPassword] = useState('');
  const newPasswordInput = React.useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordInput = React.useRef();
  const [errors, setErrors] = useState({});

  const handleResetPassword = (event) => {
    event.preventDefault();
    if (validate()) {
      resetPassword(temporaryPassword, newPassword);
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!temporaryPassword.trim()) {
      isValid = false;
      errors['temporaryPassword'] = 'Required*';
    }

    if (temporaryPassword.trim() && typeof temporaryPassword !== 'undefined') {
      if (temporaryPassword.length != 11) {
        isValid = false;
        errors['temporaryPassword'] = 'Invalid temporary password';
      }
    }

    if (!newPassword.trim()) {
      isValid = false;
      errors['newPassword'] = 'Required*';
    }

    if (!confirmPassword.trim()) {
      isValid = false;
      errors['confirmPassword'] = 'Required*';
    }

    if (newPassword.trim() && typeof newPassword !== 'undefined') {
      if (newPassword.length < 8) {
        isValid = false;
        errors['newPassword'] = 'Must have minimum 8 characters length';
      }
    }

    if (typeof newPassword !== 'undefined' && typeof confirmPassword !== 'undefined') {
      if (newPassword != confirmPassword) {
        isValid = false;
        errors['newPassword'] = 'Password doesn\'t match with confirm password';
      }
    }

    setErrors(errors);
    return isValid;
  }

  function resetPassword(temporaryPassword, newPassword) {
    const url = 'http://18.221.60.193/reset-password';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: route.params.username,
        temp_pwd: temporaryPassword,
        pwd: newPassword
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
          alert('Successfully reset your password!');
          tempPasswordInput.current.clear();
          newPasswordInput.current.clear();
          confirmPasswordInput.current.clear();
          navigation.navigate('Sign In');
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

      <Text style={styles.title}>Reset Your{"\n"}Password</Text>

      <Text style={styles.text}>Reset your password{"\n"}using the temporary password we sent{"\n"}to your registered phone number</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={tempPasswordInput}
          placeholder='Temporary password'
          placeholderTextColor='#666666'
          secureTextEntry={true}
          onChangeText={(temporaryPassword) => setTemporaryPassword(temporaryPassword)}
        />
        <Text style={styles.errors}>{errors.temporaryPassword}</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          ref={newPasswordInput}
          placeholder='New Password'
          placeholderTextColor='#666666'
          secureTextEntry={true}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        />
        <Text style={styles.errors}>{errors.newPassword}</Text>
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

      <TouchableOpacity style={styles.resetPassword}>
        <Text style={styles.resetPasswordText} onPress={(event) => handleResetPassword(event)}>Reset Password</Text>
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

  resetPassword: {
    width: '80%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#35BEE0',
  },

  resetPasswordText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default ResetPassword;