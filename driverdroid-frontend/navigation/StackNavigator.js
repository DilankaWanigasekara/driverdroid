import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Verify from '../screens/VerifyDevice';
import Register from '../screens/RegisterDevice';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#35BEE0',
                },
                headerTintColor: 'white',
                headerBackTitle: 'Back',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name='Sign In' component={SignIn} />
            <Stack.Screen name='Sign Up' component={SignUp} />
            <Stack.Screen name='Forgot Password' component={ForgotPassword} />
            <Stack.Screen name='Verify Device' component={Verify} />
            <Stack.Screen name='Register Device' component={Register} />
            <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;