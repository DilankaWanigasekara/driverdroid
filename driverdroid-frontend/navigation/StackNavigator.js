import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import Verify from '../screens/VerifyDevice';
import Register from '../screens/RegisterDevice';
import DrawerNavigator from './DrawerNavigator';
import DriverHistoryStats from '../screens/DriverHistoryStats';

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
            <Stack.Screen name='Reset Password' component={ResetPassword} />
            <Stack.Screen name='Verify Device' component={Verify} />
            <Stack.Screen name='Register Device' component={Register} />
            <Stack.Screen name='Driver History Statistics' component={DriverHistoryStats} options={{ headerShown: true, title: 'Driver History Statistics' }} />
            <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;