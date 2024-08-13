import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const SplashScreenView = () => {
  const navigation = useNavigation();
  // When Open the Apk, It's Run Function
  useEffect(() => {
    setTimeout(() => {
      // Navigate to GetStarted Screen
      navigation.navigate('GetStarted');
    }, 1000);
  }, []);
  return (
    // Background Color
    <LinearGradient
      colors={[
        'rgba(18, 17, 17, 1)',  
        'rgba(18, 17, 17, 1)',
        'rgba(253, 229, 0, 0.4)',
      ]}
      style={styles.container}>
      {/* Logo Container */}
      <Image source={require('./Logo.png')} style={styles.logo} />
      <Text style={styles.txt}>SnapUp</Text>
    </LinearGradient>
  );
};

export default SplashScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 82.92,
    height: 82.99,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  txt: {
    fontFamily: 'Unbounded-Regular',
    fontSize: 35,
    color: '#FFFFFF',
  },
});
