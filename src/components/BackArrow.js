import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'

// Responsiveness-Code-Start
const {width, height} = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
};
// Responsiveness-Code-End
const BackArrow = () => {
  return (
    <SafeAreaView style={styles.Container}>
        <TouchableOpacity style={styles.header}>
            <Image style={styles.arrow} source={require('./left-arrow.png')}/>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BackArrow

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        maxWidth: '95%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
      },
    header: {
        width: '100%',
        height: responsiveHeight(5),
        justifyContent: 'center',
        // borderColor: 'white',
        // borderWidth: 1,
      },
      arrow: {
        resizeMode: 'center',
        width: responsiveWidth(7),
        height: responsiveHeight(4),
      },
})