import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({children}) => {
  return (
    <LinearGradient
      colors={[
        'rgba(253, 229, 0, 0.5)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}
      style={styles.BgColors}>
      <SafeAreaView style={styles.Wrapper}>{children}</SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  BgColors: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  Wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: '5%', // Responsive padding to ensure content doesn't touch edges
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Background;
