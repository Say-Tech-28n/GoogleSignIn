import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import Accessories from '../components/Accessories';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
const BluetoothNeckband = () => {
  return (
    <Background>
      <View style={styles.Header}>
        <Text style={styles.HeaderTxt}>
          Bluetooth {'\n'}
          Neckbands
        </Text>
        <Text style={styles.title}>Accessories</Text>
      </View>
      <View style={styles.AccessoriesContainer}>
        <Accessories/>
      </View>
    </Background>
  );
};

export default BluetoothNeckband;

const styles = StyleSheet.create({
  Header: {
    width: '90%',
  },
  HeaderTxt: {
    fontSize: responsiveWidth(8), // Responsive font size
    fontWeight: '400',
    color: '#FFFFFF',
  },
  title: {
    fontSize: responsiveWidth(4),
    fontWeight: '300',
    color: 'rgba(151, 151, 151, 1)',
  },
  AccessoriesContainer: {
    width: '95%',
    height: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(35, 33, 24, 0.7)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
}
});
