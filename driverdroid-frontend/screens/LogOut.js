import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const LogOut = ({ navigation }) => {
    const [clearedStorage, setClearedStorage] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                logOut();
            })();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                if (clearedStorage) {
                    navigation.navigate('Sign In');
                }
            })();
        }, [clearedStorage])
    );

    //provide user the option to log out from the app
    const logOut = async () => {
        try {
            Alert.alert(
                'Confirm Log Out',
                'Do you want to log out from driverdroid?',
                [
                    {
                        text: 'Yes',
                        onPress: () => { clearStorage() }
                    },
                    {
                        text: 'No',
                        onPress: () => { navigation.navigate('Home') }
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log(error)
        }
    }

    //clear data in the async storage
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            setClearedStorage(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
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
});

export default LogOut;