import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Responsiveness-Code-Start
const {width, height} = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
}; // Responsiveness-Code-End

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  //authToken is Verify User is Registered or Not!
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
    };
    getToken();
  }, []);

  // BackArrow Code Start
  const backtoLogin = () => {
    navigation.navigate('PasswordLogin');
  }; // BackArrow Code End

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        'https://phpstack-1252920-4618688.cloudwaysapps.com/api/forget-password', //forget-Password API
        {email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 401) {
        alert('Unauthorized access. Please check your token or login again.');
      } else {
        const otpToken = response.data.token;
        console.log('response data is-->', response.message);
        await AsyncStorage.setItem('otpToken', otpToken);
        alert('A reset code has been sent to your email.');
        navigation.navigate('EnterCode', {email});
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
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
      ]}>
      <SafeAreaView style={styles.Container}>
        {/* Back */}
        <TouchableOpacity style={styles.header} onPress={backtoLogin}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>Forgot Password {'\n'} </Text>
          <Text style={styles.forgotDesc}>
            Enter the Email address with your account and we'll send an email
            with confirmation to reset your password
          </Text>
        </View>
        {/* Input Container */}
        <View style={styles.credContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        {/* Button Container */}
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  // Main Container
  Wrapper: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Container
  Container: {
    flex: 1,
    maxWidth: '95%',
    width: '100%',
    position: 'relative',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  // Back Arrow Container
  header: {
    width: '8%',
    height: responsiveHeight(4),
    justifyContent: 'space-around',
  },
  arrow: {
    resizeMode: 'center',
    width: responsiveWidth(7),
    height: responsiveHeight(4),
  },
  // Logo Container
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
    textAlign: 'center',
  },
  // Logo Text Container
  logoTxtContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotDesc: {
    color: '#FFFFFF',
    fontSize: responsiveWidth(3),
    textAlign: 'center',
  },
  // Parent Input Container
  credContainer: {
    width: '100%',
    height: responsiveHeight(15),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Input Container
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
  //
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
