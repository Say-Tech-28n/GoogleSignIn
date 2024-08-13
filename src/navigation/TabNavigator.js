import {LogBox, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../components/UserProfile';
import Logout from '../components/Logout';
import Pairing from '../screens/Looking Device';
import Bluetooth from '../screens/Bluetooth'
import Devices from '../screens/Devices';
import BluetoothNeckband from '../screens/BluetoothNeckband';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(18, 17, 17, 1)', // Dark background color for the tab bar
          height: 50, // Height of the tab bar
          width: '100%', // Set tab bar width to 90%
          alignSelf: 'center', // Center the tab bar horizontally
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          // position: 'absolute', // Position it absolutely
          bottom: 0, // Place it at the bottom of the screen
          elevation: 10, // Shadow for better visibility on Android
          shadowColor: '#000', // Shadow color for iOS
          shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
          shadowOpacity: 0.3, // Shadow opacity for iOS
          shadowRadius: 4, // Shadow radius for iOS
        },
        tabBarLabelStyle: {
          color: 'white', // Color of the tab labels
          fontSize: 14, // Font size of the tab labels
          textAlign: 'center', // Center the text horizontally
        },
        tabBarIconStyle: {
          color: 'white', // Color of the icons
        },
        tabBarItemStyle: {
          alignItems: 'center', // Center items horizontally
          justifyContent: 'center', // Center items vertically
        },
      }}>
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pairing"
        component={Pairing}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name='Devices' component={Devices} options={{headerShown: false}}/>
      <Tab.Screen name='BN' component={BluetoothNeckband} options={{headerShown: false}}/>  
      <Tab.Screen name="Logout" component={Logout}/>
      <Tab.Screen name='BT' component={Bluetooth}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});