import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEye from 'react-native-vector-icons/Entypo'
import IconUser from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; //Async Storage used for Store Data

// Responsiveness-Code-Start
const { width, height } = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
};
// Responsiveness-Code-End
const PasswordLogin = () => {
  const navigation = useNavigation(); // Hook to access the navigation object
  const [username, setUsername] = useState(''); // State to hold the username input
  const [password, setPassword] = useState(''); // State to hold the password input
  const [error, setError] = useState(null); // State to hold error messages
  const [errorVisible, setErrorVisible] = useState(true); // State to manage error visibility
  const [rememberMe, setRememberMe] = useState(false); // State to manage checkbox
  const [passwordVisible, setPasswordVisible] = useState(false) //State to manage Pass Hide & Show

  //Login Auth Context
  const { login } = useContext(AuthContext); // Access the login function from the AuthContext

  // Retrieve stored credentials if available
  useEffect(() => {
    const retrieveCredentials = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedUsername && storedPassword) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to retrieve credentials:', error);
      }
    };
    retrieveCredentials();
  }, []);
  // Back to Login Page Navigation
  const backtoLogin = () => {
    navigation.navigate('CredsLogin');
  };
  const forgotPass = () => {
    navigation.navigate('ForgotPassword');
  };
  const redirectSignUp = () => {
    navigation.navigate('SignUp');
  };
  // Function to handle the login logic
  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://phpstack-1252920-4618688.cloudwaysapps.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );

      const data = await response.json();
      console.log('API Response:', data); // Log the response for debugging

      if (response.ok) {
        const { accessToken } = data; // Adjust based on the actual response structure

        if (accessToken) {
          try {
            await AsyncStorage.setItem('authToken', accessToken);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            login(); // Call the login function from the context
            navigation.navigate('UserProfile'); // Navigate to the UserProfile screen
            if (rememberMe) {
              await AsyncStorage.setItem('username', username);
              await AsyncStorage.setItem('password', password);
            } else {
              await AsyncStorage.removeItem('username');
              await AsyncStorage.removeItem('password');
            }
          } catch (storageError) {
            console.error('AsyncStorage Error:', storageError);
            setError('Failed to store authentication token.');
            setErrorVisible(true);
            setTimeout(() => {
              setErrorVisible(false);
            }, 1000);
          }
        } else {
          setError('Token not received from the server.');
          setErrorVisible(true);
          setTimeout(() => {
            setErrorVisible(false);
          }, 1000);
        }
      } else {
        setError(data.message || 'Login failed');
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setError('An error occurred. Please try again.');
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 1000);
    }
  };

  return (
    // Background Color
    <LinearGradient
      style={styles.mainContainer}
      colors={[
        'rgba(253, 229, 0, 1)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}>
      {/* Main Container */}
      <SafeAreaView style={styles.Container}>
        {/* Child Container */}
        <TouchableOpacity style={styles.header} onPress={backtoLogin}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>
            Login to {'\n'}
            your account
          </Text>
        </View>
        {/* Input Container */}
        <View style={styles.credContainer}>
          <View style={styles.inputContainer}>
            <IconUser name="user" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888" 
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
              keyboardType='email-address'
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="password" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry={!passwordVisible} // Conditionally set secureTextEntry
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <IconEye
                name={passwordVisible ? 'eye' : 'eye-with-line'} // Toggle eye icon
                size={20}
                color="white"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>
          {/* CheckBox Container */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              tintColors={{ true: '#FFD700', false: '#FFD700' }}
            />
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          {/* Error Message */}
          {errorVisible && error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          {/* Button Container */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={forgotPass}>
            <Text style={{ color: 'yellow' }}>Forgot the password?</Text>
          </TouchableOpacity>
          {/* Hr Line */}
          <View style={styles.linesContainer}>
            <View style={styles.lBox}></View>
            <View>
              <Text style={{ color: 'white', marginTop: -15, padding: 5, fontSize: 12 }}>or continue with</Text>
            </View>
            <View style={styles.rBox}></View>
          </View>
        </View>
        {/* Social Login */}
        <View style={styles.socailLoginCon}>
          <TouchableOpacity>
            <Image source={require('./pixel.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./ios.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.SignUp}>
          Don’t have an account?{' '}
          <Text style={styles.signUpStyle}>
            <TouchableOpacity onPress={redirectSignUp}>
              <Text style={styles.signUpStyle}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PasswordLogin;

const styles = StyleSheet.create({
  // Main Container
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Child Container
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
    // borderColor: 'white',
    // borderWidth: 1,
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
    fontSize: responsiveWidth(9),
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
  // Parent Input Container
  credContainer: {
    width: '100%',
    height: responsiveHeight(35),
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  iconRight: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#fff',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  // Hr Line
  linesContainer: {
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
  },
  lBox: {
    width: responsiveWidth(25),
    height: responsiveHeight(0.1),
    backgroundColor: '#FFFFFF',
  },
  rBox: {
    width: responsiveWidth(25),
    height: responsiveHeight(0.1),
    backgroundColor: '#FFFFFF',
  },
  // 
  socailLoginCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(50),
    height: responsiveHeight(7),
    alignSelf: 'center',
  },
  SignUp: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  signUpStyle: {
    color: '#FDE501',
  },
});
