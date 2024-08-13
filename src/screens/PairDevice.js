import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Background from '../components/Background'; // Your Background component
import ActivitesContainer from '../components/ActivitesContainer';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);

const PairDevice = () => {
  return (
    <Background>
      <View style={styles.HeadingContainer}>
        <Text style={styles.Heading}>
          Good Day, {'\n'}
          User
        </Text>
        <Text style={styles.title}>DD-MM-YYYY</Text>
      </View>
      <View style={styles.PairDeviceBtnComponent}>
        <TouchableOpacity style={styles.PairDeviceBtn}>
          <Text style={styles.PairDeviceBtnTxt}>Pair your Device</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.activitiesContainer}>
        <ActivitesContainer />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    width: '90%',
    marginVertical: responsiveHeight(4),
  },
  Heading: {
    fontSize: responsiveWidth(8),
    fontWeight: '400',
    color: '#FFFFFF',
  },
  title: {
    fontSize: responsiveWidth(4.5),
    fontWeight: '300',
    color: '#979797',
  },
  PairDeviceBtnComponent: {
    alignItems: 'center',
    marginVertical: responsiveHeight(4),
  },
  PairDeviceBtn: {
    width: responsiveWidth(85),
    height: responsiveHeight(5),
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: 'rgba(253, 229, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(3.5),
  },
  PairDeviceBtnTxt: {
    fontSize: responsiveWidth(5),
    fontWeight: '400',
    color: '#FFFFFF',
  },
  activitiesContainer: {
    width: '95%',
    height: '70%', // Adjusted height to fit the screen
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(35, 33, 24, 1)',
    paddingVertical: responsiveHeight(2),
  },
});

export default PairDevice;
