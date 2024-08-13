import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import WatchFaces from '../components/WatchFaces';
const {width, height} = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
const Devices = () => {
  return (
    <Background>
        <View style={styles.HeadingContainer}>
            <Text style={styles.Heading}>
                Connect your {'\n'}
                Device
            </Text>
        </View>
        <View style={styles.DeviceContainer}>
            <WatchFaces/>
        </View>
    </Background>
  )
}

export default Devices

const styles = StyleSheet.create({
    HeadingContainer: {
        width: '90%', // Responsive width with some marginS
      },    
      Heading: {
        fontSize: responsiveWidth(8), // Responsive font size
        fontWeight: '400',
        color: '#FFFFFF',
      },
      DeviceContainer: {
        width: '95%',
        height: '70%', // Adjusted height to fit the screen
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'rgba(35, 33, 24, 1)',
        paddingVertical: responsiveHeight(2),
      },
})    