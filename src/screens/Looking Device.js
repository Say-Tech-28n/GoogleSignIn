import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Background from '../components/Background';
import Animated from '../components/Animated';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);

const Pairing = () => {
  return (
    <Background>
      <View style={styles.HeadingContainer}>
        <Text style={styles.Heading}>
          Looking for {'\n'}
          your device
        </Text>
        <Text style={styles.tittle}>
          Just make sure that your device {'\n'}
          and phone’s Bluetooth are turned on
        </Text>
      </View>
      <View style={styles.AnimatedContainer}>
        <Animated />
      </View>
      <View style={styles.PairLaterBtnComponent}>
        <TouchableOpacity style={styles.PairLaterBtn}>
          <Text style={styles.PairLaterBtnTxt}>Pair Later</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ErrorTxtContainer}>
        <Text style={styles.ErrorTxt}>
          Unable to search or pair your device?
        </Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    width: '90%', // Responsive width with some marginS
  },
  Heading: {
    fontSize: responsiveWidth(8), // Responsive font size
    fontWeight: '400',
    color: '#FFFFFF',
  },
  tittle: {
    fontSize: responsiveWidth(4.5), // Responsive font size
    fontWeight: '300',
    color: '#979797',
    marginTop: responsiveHeight(2), // Margin top with percentage-based units
  },
  AnimatedContainer: {
    marginVertical: responsiveHeight(4), // Margin for vertical spacing
    alignItems: 'center', // Center align animated component
  },
  PairLaterBtnComponent: {
    alignItems: 'center',
    marginVertical: responsiveHeight(4), // Margin for vertical spacing
  },
  PairLaterBtn: {
    width: responsiveWidth(85), // Responsive width
    height: responsiveHeight(5), // Res ponsive height
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: 'rgba(90, 90, 90, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(3.5), // Responsive border radius
  },
  PairLaterBtnTxt: {
    fontSize: responsiveWidth(5), // Responsive font size
    fontWeight: '400',
    color: '#FFFFFF',
  },
  ErrorTxtContainer: {
    alignItems: 'center', // Center align error text
    marginTop: responsiveHeight(4), // Margin top with percentage-based units
  },
  ErrorTxt: {
    color: 'rgba(151, 151, 151, 1)',
    fontSize: responsiveWidth(4), // Responsive font size
    fontWeight: '300',
    textAlign: 'center', // Center text
  },
});
export default Pairing;
