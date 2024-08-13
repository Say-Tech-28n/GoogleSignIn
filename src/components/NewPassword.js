import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Responsiveness-Code-Start
const { width, height } = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
};
// Responsiveness-Code-End

const NewPassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('')

  // 
  useEffect(()=>{
    const getresetToken = async () =>{
      try{
        const token =  await AsyncStorage.getItem('restpassToken')
        console.log('get Reset Pass Token', token);
        if(token) {
          setResetToken(token)
        }
        else{
          console.error('No Token Found in AsynStorage');
          alert('No Token Found in AsynStorage, TryAgain')
        }
      }catch(error){
        console.error('Error to get Token', error)
        alert('Error. Please Try Again')
      }
    };
    getresetToken();
  }, []);

  const backtoLogin = () => {
    navigation.navigate('PasswordLogin');
    console.log('first');
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'https://phpstack-1252920-4618688.cloudwaysapps.com/api/update-password',
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${resetToken}`
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Password has been updated', [
          { text: 'OK', onPress: () => navigation.navigate('PasswordLogin') },
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <LinearGradient
      style={styles.Wrapper}
      colors={[
        'rgba(253, 229, 0, 1)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}
    >
      <SafeAreaView style={styles.Container}>
        {/* Back */}
        <TouchableOpacity style={styles.header} onPress={backtoLogin}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>Enter New Password</Text>
          <Text style={styles.title}>
            This password should be different from the previous password.
          </Text>
        </View>
        {/* Input Container */}
        <View style={styles.credContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter New Password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
        {/* Button Container */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    flex: 1,
    maxWidth: '95%',
    width: '100%',
    position: 'relative',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    width: '8%',
    height: responsiveHeight(5),
    justifyContent: 'center',
  },
  arrow: {
    resizeMode: 'center',
    width: responsiveWidth(7),
    height: responsiveHeight(4),
  },
  logoContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: responsiveWidth(5),
    fontFamily: 'Unbounded-Black',
  },
  title: {
    color: 'white',
    fontSize: responsiveWidth(3),
    fontFamily: 'Unbounded-Black',
  },
  credContainer: {
    width: '100%',
    height: responsiveHeight(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#333',
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FDE5004D',
    borderColor: '#FDE500',
    borderWidth: 2,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: '20%',
  },
  buttonText: {
    fontSize: responsiveWidth(3.0),
    color: '#DBE7E8',
    textAlign: 'center',
    fontFamily: 'WorkSans-ExtraBold',
  },
});
