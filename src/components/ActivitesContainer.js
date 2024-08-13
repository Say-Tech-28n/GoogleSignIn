import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'


const { width, height } = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
const ActivitesContainer = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.StepContainer}></View>
          <View style={styles.DistContainer}></View>
          <View style={styles.HeartRateContainer}></View>
          <View style={styles.SleepContainer}></View>
          <View style={styles.BloodContainer}></View>
          <View style={styles.StressContainer}></View>
        </ScrollView>
  )
}

export default ActivitesContainer

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
      DistContainer: {
        width: '90%',
        height: responsiveHeight(15), // Adjusted height
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(159, 157, 157, 1)',
        backgroundColor: 'rgba(253, 229, 0, 0.1)',
        marginBottom: responsiveHeight(2),
      },
      HeartRateContainer: {
        width: '90%',
        height: responsiveHeight(15), // Adjusted height
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(159, 157, 157, 1)',
        backgroundColor: 'rgba(253, 229, 0, 0.1)',
        marginBottom: responsiveHeight(2),
      },
      SleepContainer: {
        width: '90%',
        height: responsiveHeight(15), // Adjusted height
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(159, 157, 157, 1)',
        backgroundColor: 'rgba(253, 229, 0, 0.1)',
        marginBottom: responsiveHeight(2),
      },
      BloodContainer: {
        width: '90%',
        height: responsiveHeight(15), // Adjusted height
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(159, 157, 157, 1)',
        backgroundColor: 'rgba(253, 229, 0, 0.1)',
        marginBottom: responsiveHeight(2),
      },
      StressContainer: {
        width: '90%',
        height: responsiveHeight(15), // Adjusted height
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(159, 157, 157, 1)',
        backgroundColor: 'rgba(253, 229, 0, 0.1)',
      },
})