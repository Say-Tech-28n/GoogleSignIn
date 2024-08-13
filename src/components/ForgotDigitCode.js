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
};
// Responsiveness-Code-End

const VerifyOtp = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState('');
  // Get OTP token from AsyncStorage when the component mounts
  useEffect(() => {
    const getOtpToken = async () => {
      try {
        const storedOtpToken = await AsyncStorage.getItem('otpToken');
        console.log('Get OTP Token at OTP Comp:', storedOtpToken);
        if (storedOtpToken) {
          setOtpToken(storedOtpToken);
        } else {
          console.error('No OTP token found in AsyncStorage');
          alert('No OTP token found. Please try again.');
          navigation.goBack('PasswordLogin'); // Go back if no token is found
        }
      } catch (error) {
        console.error('Error retrieving OTP token:', error);
        alert('Error retrieving OTP token. Please try again.');
      }
    };

    getOtpToken();
  }, []);

  console.log('Otp is -->', otpToken);

  console.log('Otp is on mobile -->', otp);

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }

    console.log('OTP in function:', otp);
    console.log('OTP Token in function:', otpToken);

    try {
      const response = await axios.post(
        'https://phpstack-1252920-4618688.cloudwaysapps.com/api/verify-otp',
        {otp},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${otpToken}`,
          },
        },
      );

      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);

      if (response.status === 401) {
        alert('Unauthorized access. Please check your OTP and try again.');
      } else if (response.status === 400) {
        alert('Invalid OTP. Please check and try again.');
      } else if (response.status === 200) {
        alert('OTP verified successfully. You can now reset your password.');
        // Store the received token in AsyncStorage
        const { token } = response.data;
        await AsyncStorage.setItem('restpassToken', token);
        console.log("reset Password Token Gotted",token)
        navigation.navigate('GenerateNewPass');
      } else {
        alert(
          response.data.message || 'Failed to verify OTP. Please try again.',
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error verifying OTP:', error.message);

        if (error.response) {
          console.error('Response Data:', error.response.data);
          if (error.response.status === 500) {
            alert('Server error. Please try again later.');
          } else {
            alert(
              error.response.data.message ||
                'An error occurred. Please try again.',
            );
          }
        } else if (error.request) {
          alert('Network error. Please check your connection and try again.');
        } else {
          alert(`Error: ${error.message}`);
        }
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
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
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack('')}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>Verify OTP {'\n'} </Text>
          <Text style={styles.forgotDesc}>
            Enter the OTP sent to your email to verify your identity and reset
            your password.
          </Text>
        </View>
        {/* Input Container */}
        <View style={styles.credContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="OTP"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={setOtp}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>
        </View>
        {/* Button Container */}
        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifyOtp;

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
    // alignItems: 'center/',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  // Back Arrow Container
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
