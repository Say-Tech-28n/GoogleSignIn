import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

const Logout = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Remove auth token and login status from AsyncStorage
      // await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('isLoggedIn');
      // Update authentication state
      // setIsLoggedIn(false);
      logout();
      // Navigate to the login screen
      console.log('Navigating to PasswordLogin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
