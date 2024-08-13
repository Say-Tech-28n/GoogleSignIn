import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React from 'react';

// Get screen dimensions
const {width, height} = Dimensions.get('window'); // Utility functions for responsive dimensions

const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
const Accessories = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.StepContainer}></View>
      <View style={styles.DistContainer}></View>
      <View style={styles.HeartRateContainer}></View>
      <View style={styles.SleepContainer}></View>
      <View style={styles.BloodContainer}></View>
      <View style={styles.StressContainer}></View>
    </ScrollView>
  );
};
export default Accessories;
const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: responsiveHeight(2), // Ensure padding at the bottom
  },
  StepContainer: {
    width: '90%',
    height: responsiveHeight(15), // Adjusted height    
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(159, 157, 157, 1)',
    backgroundColor: 'rgba(253, 229, 0, 0.1)',
    marginBottom: responsiveHeight(2),
  },
});
