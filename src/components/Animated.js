import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image, ImageBackground, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Utility functions for responsive dimensions Code Start
const responsiveWidth = percentage => Math.round((percentage * width) / 100);
const responsiveHeight = percentage => Math.round((percentage * height) / 100);
// Utility functions for responsive dimensions Code End

const SmoothInfiniteEaseInOutBackAnimation = (props) => {
    const scale = useRef(new Animated.Value(1)).current; // Initial scale value
    useEffect(() => {
        // Define the animation
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5, // Scale value to animate to
                    duration: 2000, // Duration to expand
                    easing: Easing.back(2), // Ease-in-out back effect
                    useNativeDriver: true, // Use native driver for smooth performance
                }),
                Animated.timing(scale, {
                    toValue: 1, // Scale value to animate back to
                    duration: 2000, // Duration to contract
                    easing: Easing.back(2), // Ease-in-out back effect
                    useNativeDriver: true, // Use native driver for smooth performance
                }),
            ])
        );
        // Start the animation
        animation.start();
        // Clean up the animation on unmount
        return () => animation.stop();
    }, [scale]);

    const animatedStyle = {
        transform: [{ scale }],
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./scanningcircle.png')}
                resizeMode='cover'
                style={styles.Bgimage}
            >
                <Animated.Image
                    source={require('./eclipse.png')}
                    style={[styles.image, animatedStyle]}
                    resizeMode='cover'
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(50), // Dynamic border radius
    },
    Bgimage: {
        width: responsiveWidth(50), // Responsive width
        height: responsiveWidth(50), // Responsive height to maintain aspect ratio
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', // Responsive width within the parent container
        height: '100%', // Responsive height within the parent container
    },
});
export default SmoothInfiniteEaseInOutBackAnimation;
