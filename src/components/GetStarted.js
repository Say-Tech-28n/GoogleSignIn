import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const GetStarted = () => {
  const navigation = useNavigation();
  // Navigate to Login Methods
  const redirectLogin = () => {
    navigation.navigate('CredsLogin');
    console.log('Redirected to Login Screen');
  };
  return (
    // Main Wrapper
    <View style={styles.wrapper}>
      {/* Child Container */}
      <View style={styles.child}>
        {/* Background Container */}
        <View style={styles.bg}>
          {/* Background Image */}
          <Image style={styles.bgImg} source={require('./bg.png')} />
        </View>
        {/* Title & Button Container */}
        <View style={styles.text}>
          {/* Title */}
          <Text style={styles.title}>
            Lorem <Text style={styles.highlight}>ipsum dolor</Text> sit
            {'\n'} amet, consectetur {'\n'}
            <Text style={styles.highlight}>adipiscing elit</Text>
          </Text>
          {/* Horizontal Line Container */}
          <View style={styles.lines}>
            <View style={styles.lineL}></View>
            <View style={styles.lineR}></View>
          </View>
          {/* Button */}
          <TouchableOpacity style={styles.btn} onPress={redirectLogin}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default GetStarted;

const styles = StyleSheet.create({
  // Main Wrapper
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  // Child Container
  child: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  // Background Image Container
  bg: {
    flex: 2,
    position: 'relative',
  },
  // Background Image Style
  bgImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'relative',
  },
  // Text Container
  text: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    marginTop: -50,
    backgroundColor: 'black',
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: width * 0.05, // Responsive padding
  },
  // Title Style
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: width * 0.07, // Responsive font size
    fontFamily: 'WorkSans-Black',
  },
  // Highlighted Title Text Style
  highlight: {
    color: '#FDE501',
  },
  // Horizontal Line Container
  lines: {
    flexDirection: 'row',
    height: 'auto',
    // top: 25
  },
  // Left Box Style
  lineL: {
    width: width * 0.15, // Responsive width
    height: height * 0.01, // Responsive height
    backgroundColor: '#FDE500',
    borderRadius: 50,
    borderColor: 'black',
    marginRight: -10,
    borderWidth: 2,
  },
  // Right Box Style
  lineR: {
    width: width * 0.13, // Responsive width
    height: height * 0.01, // Responsive height
    backgroundColor: '#DBE7E8',
    borderRadius: 50,
    borderColor: 'black',
    marginLeft: -10,
    borderWidth: 2,
  },
  // Button Style
  btn: {
    backgroundColor: '#FDE5004D',
    borderColor: '#FDE500',
    borderWidth: 2,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: height * 0.015, // Responsive vertical padding
    paddingHorizontal: '20%',
  },
  // Button Text Style
  btnText: {
    fontSize: width * 0.055, // Responsive font size
    color: '#DBE7E8',
    // padding: 10,
    textAlign: 'center',
  },
});
