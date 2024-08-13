import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// Utility functions for responsive dimensions
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
const WatchFaces = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.PopularDevicesCon}>
        <Text style={{color: 'white'}}>Popular Devices</Text>
        <ScrollView horizontal style={styles.WatchFaces}>
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
        </ScrollView>
      </View>
      <View style={styles.PopularDevicesCon}>
        <Text style={{color: 'white'}}>Apple</Text>
        <ScrollView horizontal style={styles.WatchFaces}>
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
        </ScrollView>
      </View>

      <View style={styles.PopularDevicesCon}>
        <ScrollView horizontal style={styles.WatchFaces}>
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
        </ScrollView>
      </View>

      <View style={styles.PopularDevicesCon}>
        <ScrollView horizontal style={styles.WatchFaces}>
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
          <Image style={styles.faces} source={require('./firstWatch.png')} />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default WatchFaces;

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: responsiveHeight(2), // Ensure padding at the bottom
  },
  PopularDevicesCon: {
    width: responsiveWidth(83),
    height: responsiveHeight(20),
    // backgroundColor: '#f0f0f0',
    padding: responsiveHeight(0.5),
    borderRadius: responsiveHeight(1),
  },
  WatchFaces: {
    flexDirection: 'row',
    padding: responsiveHeight(1),
    borderRadius: responsiveHeight(1),
  },
  faces: {
    marginRight: 15,
  },
});
