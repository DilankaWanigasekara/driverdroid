import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import StackNavigator from './navigation/StackNavigator';


const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
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
      <StackNavigator />
    </NavigationContainer> 
  );
};

export default App;