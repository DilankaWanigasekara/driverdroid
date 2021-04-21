import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactUs from '../screens/ContactUs';
import DriverHistory from '../screens/DriverHistory';
import About from '../screens/About';
import Home from '../screens/Home';
import { Icon } from 'react-native-elements';
import RestPlaces from '../screens/RestPlaces';
import LogOut from '../screens/LogOut';

//create drawer navigator for the drawer navigation of the app
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContentOptions={{
        activeBackgroundColor: '#35BEE0',
        activeTintColor: 'white',
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#35BEE0',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
      }}
    >
    {/* drawer screen details of the home screen */}
      <Drawer.Screen name='Home' component={Home}
        options={{
          headerShown: true,
          title: 'Home',
          drawerIcon: () => (
            <Icon
              name='home'
              type='font-awesome'
              color='black'
              size={20}
            />),
        }}
      />
      {/* drawer screen details of the rest places screen */}
      <Drawer.Screen name='Rest Places' component={RestPlaces}
        options={{
          headerShown: true,
          title: 'Rest Places',
          drawerIcon: () => (
            <Icon
              name='cutlery'
              type='font-awesome'
              color='black'
              size={20}
            />),
        }}
      />
      {/* drawer screen details of the driver history screen */}
      <Drawer.Screen name='Driver History' component={DriverHistory}
        options={{
          headerShown: true,
          title: 'Driver History',
          drawerIcon: () => (
            <Icon
              name='history'
              type='font-awesome'
              color='black'
              size={20}
            />),
        }}
      />
      {/* drawer screen details of the about screen */}
      <Drawer.Screen name='About' component={About}
        options={{
          headerShown: true,
          title: 'About',
          drawerIcon: () => (
            <Icon
              name='users'
              type='font-awesome'
              color='black'
              size={20}
            />),
        }}
      />
      {/* drawer screen details of the contact us screen */}
      <Drawer.Screen name='Contact Us' component={ContactUs}
        options={{
          headerShown: true,
          title: 'Contact Us',
          drawerIcon: () => (
            <Icon
              name='mail-bulk'
              type='font-awesome-5'
              color='black'
              size={20}
            />),
        }}
      />
      {/* drawer screen details of the log out screen */}
      <Drawer.Screen name='Log Out' component={LogOut}
        options={{
          headerShown: true,
          title: 'Log Out',
          drawerIcon: () => (
            <Icon
              name='sign-out'
              type='font-awesome'
              color='black'
              size={20}
            />),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;