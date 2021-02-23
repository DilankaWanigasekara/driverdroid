import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
  'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded) {
    return(
      <AppLoading
        startAsync = {fetchFonts}
        onFinish = {() => setFontsLoaded(true)}
        onError = {(err) => console.error(err)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'SignIn'
          component = {SignIn}
        />
        <Stack.Screen 
          name = 'SignUp' 
          component = {SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;