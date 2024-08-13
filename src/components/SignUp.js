import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Responsiveness Code Start
const {width, height} = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
};
// Responsive Code End

const SignUp = () => {
  const navigation = useNavigation(); // Navigation object to handle screen navigation
  const [firstName, setFirstName] = useState(''); // State for first name input
  const [lastName, setLastName] = useState(''); // State for last name input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const [error, setError] = useState(null); // State for error messages
  const [required, setRequired] = useState(null); // State for required fields message

  // Function to clear error messages
  const clearErrors = () => {
    setError(null);
    setRequired(null);
  };

  // Function to navigate back to the credentials login page
  const backtoCreds = () => {
    navigation.navigate('CredsLogin');
  };

  // SignUp Logic
  const handleSignUp = async () => {
    clearErrors(); // Clear any existing errors

    // Input validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setRequired('All fields are required'); // Show required fields error
      setTimeout(() => {
        setRequired(null); // Clear required error after 1 second
      }, 1000);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Show password mismatch error
      setTimeout(() => {
        setError(null); // Clear password error after 3 seconds
      }, 3000);
      return;
    }

    try {
      // API call to signup endpoint
      const response = await fetch(
        'https://phpstack-1252920-4618688.cloudwaysapps.com/api/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
            confirm_password: confirmPassword,
            firstname: firstName,
            lastname: lastName,
          }),
        },
      );

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        await AsyncStorage.setItem('isLoggedIn', 'false'); // Store login status in AsyncStorage
        await AsyncStorage.setItem('userFirstName', firstName);
        await AsyncStorage.setItem('userLastName', lastName);
        await AsyncStorage.setItem('userEmail', email);

        navigation.navigate('PasswordLogin'); // Navigate to PasswordLogin screen on successful signup
      } else {
        setError(data.message || 'SignUp failed'); // Show API error message or default signup failed
        setTimeout(() => {
          setError(null); // Clear API error after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      setError('An error occurred. Please try again.'); // Show network or other error
      setTimeout(() => {
        setError(null); // Clear error after 3 seconds
      }, 3000);
    }
  };
  return (
    <LinearGradient
      style={styles.wrapper}
      colors={[
        'rgba(253, 229, 0, 1)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}>
      {/* Main Container */}
      <SafeAreaView style={styles.Container}>
        {/* Back Arrow Button */}
        <TouchableOpacity style={styles.header} onPress={backtoCreds}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        {/* Logo Text */}
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>Create your account</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.SignUpInputsContainer}>
          {/* First Name Input */}
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Enter Your First Name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.input}
            />
          </View>
          {/* Last Name Input */}
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Enter Your Last Name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
            />
          </View>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Enter Your Mail Address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
          </View>
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry //is Used for Show Typed Password in Asterisk*
            />
          </View>
          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Confirm Your Password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              style={styles.input}
              secureTextEntry //is Used for Show Typed Password in Asterisk*
            />
          </View>
        </View>
        {/* Required Fields Error */}
        {required && <Text style={styles.errorText}>{required}</Text>}
        {/* API or General Error */}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Main Container
  Container: {
    flex: 1,
    maxWidth: '95%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  // Back Arrow Container
  header: {
    width: '8%',
    height: responsiveHeight(4),
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
    height: '12.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: responsiveWidth(6),
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
  // Sign Up Inputs Container
  SignUpInputsContainer: {
    width: '100%',
    height: responsiveHeight(40),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  // Individual Input Container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#333',
  },
  // TextInput Style
  input: {
    width: '75%',
    color: '#fff',
  },
  // Sign Up Button Style
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
  // Button Text Style
  buttonText: {
    fontSize: responsiveWidth(3),
    color: '#DBE7E8',
    textAlign: 'center',
    fontFamily: 'WorkSans-ExtraBold',
  },
  // Error Text Style
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
