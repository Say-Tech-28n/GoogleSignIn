import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

// Responsiveness Code Start
const {width, height} = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
}; // Responsiveness Code End
//SignUp & Password Navigation Code Start
const CredsLogin = () => {
  const navigation = useNavigation();
  //Navigation for Password Login screen
  const passLogin = () => {
    navigation.navigate('PasswordLogin');
  };
  //Navigation for SignUp Screen
  const redirectSignUp = () => {
    navigation.navigate('SignUp');
  };
  //Navigation Back to Get Started Button
  const backtoGT = () => {
    navigation.navigate('GetStarted');
  };
  //SignUp & Password Navigation Code End
  // Continue With Google Code Start
  GoogleSignin.configure({
    webClientId:
      '217556929363-717mv94qo238mplmk1ashmkiip2q9d6v.apps.googleusercontent.com',
    iosClientId:
      '217556929363-ukgada82fs2cd2j99koop1u6l0fd0kdc.apps.googleusercontent.com',
    androidClientId:
      '217556929363-grvue029t8nl47vqa8lqvc4dooq5sr12.apps.googleusercontent.com',
    offlineAccess: true, //WebClient ID from FireBase
  });
  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };
  // New Func
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const {idToken, user} = response;
      console.log(user);
      setUser(user);

      const resp = await axios.post('',{
        token: idToken,
        email:user.email,
      });
      if (resp.data.success) {
        // If the token is valid, navigate to the Dashboard screen
        navigation.navigate('UserProfile', {
          firstName: user.givenName,
          lastName: user.familyName,
          email: user.email,
        });
      } else {
        setError('Invalid token');
      }
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    // Gradient
    <LinearGradient
      style={styles.mainContainer}
      colors={[
        'rgba(253, 229, 0, 1)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}>
      {/* MainContainer */}
      <SafeAreaView style={styles.Container}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.header} onPress={backtoGT}>
          <Image style={styles.arrow} source={require('./left-arrow.png')} />
        </TouchableOpacity>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Logo.png')} />
        </View>
        {/* Logo Txt */}
        <View style={styles.logoTxtContainer}>
          <Text style={styles.logoText}>Let’s get you in</Text>
        </View>
        {/* Logins Methods */}
        <View style={styles.authContainer}>
          {/*  */}
          <TouchableOpacity
            style={styles.googleContainer}
            onPress={handleGoogleLogin}>
            <View style={styles.googleLogoCon}>
              {/* Logo */}
              <Image
                style={styles.googleLogo}
                source={require('./google.png')}
              />
            </View>
            <View style={styles.googleTxtCon}>
              {/*  */}
              <Text style={styles.googleTxt}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={styles.fbContainer}>
            <View style={styles.fbLogoCon}>
              {/* Logo */}
              <Image style={styles.fbLogo} source={require('./fb.png')} />
            </View>
            <View style={styles.fbTxtCon}>
              {/* Txt */}
              <Text style={styles.fbTxt}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={styles.appleContainer}>
            <View style={styles.iOSLogoCon}>
              {/* Logo */}
              <Image style={styles.iOSLogo} source={require('./apple.png')} />
            </View>
            <View style={styles.iOSTxtCon}>
              {/* Txt */}
              <Text style={styles.iOSTxt}>Continue with Apple</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Hr Line */}
        <View style={styles.linesContainer}>
          <View style={styles.lBox}></View>
          <View>
            <Text style={{color: 'white', marginTop: -15, padding: 5}}>or</Text>
          </View>
          <View style={styles.rBox}></View>
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={passLogin}>
          <Text style={styles.buttonText}>Log in with a password</Text>
        </TouchableOpacity>
        {/* Sign Up Button */}
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

export default CredsLogin;

const styles = StyleSheet.create({
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
    fontSize: responsiveWidth(9),
    fontFamily: 'Unbounded-Black',
  },
  logoTxtContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '100%',
    height: responsiveHeight(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  googleContainer: {
    width: responsiveWidth(85),
    height: responsiveHeight(6),
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBE7E8',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
  googleLogo: {
    borderRadius: 50,
  },
  googleLogoCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '25%',
    alignItems: 'flex-end',
  },
  googleTxtCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '65%',
  },
  googleTxt: {
    fontFamily: 'WorkSans-Bold',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  fbContainer: {
    width: responsiveWidth(85),
    height: responsiveHeight(6),
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBE7E8',
  },
  fbLogoCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '25%',
    alignItems: 'flex-end',
  },
  fbLogo: {
    borderRadius: 100,
  },
  fbTxtCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '65%',
  },
  fbTxt: {
    fontFamily: 'WorkSans-Bold',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  appleContainer: {
    width: responsiveWidth(85),
    height: responsiveHeight(6),
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBE7E8',
  },
  iOSLogoCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '25%',
    alignItems: 'flex-end',
  },
  iOSLogo: {
    borderRadius: 100,
  },
  iOSTxtCon: {
    // borderColor: 'white',
    // borderWidth: 1,
    width: '65%',
  },
  iOSTxt: {
    fontFamily: 'WorkSans-Bold',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  linesContainer: {
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
  },
  lBox: {
    width: responsiveWidth(35),
    height: responsiveHeight(0.1),
    backgroundColor: '#FFFFFF',
  },
  rBox: {
    width: responsiveWidth(35),
    height: responsiveHeight(0.1),
    backgroundColor: '#FFFFFF',
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
  SignUp: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  signUpStyle: {
    color: '#FDE501',
  },
});
