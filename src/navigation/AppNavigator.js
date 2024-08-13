import React, { useEffect, useState } from 'react'; // useEffect() hook for side effects and useState() for state management
import StackNavigator from './StackNavigator'; // StackNavigator component
import TabNavigator from './TabNavigator'; // TabNavigator component
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for storing data locally
import { useAuth } from '../context/AuthContext'; // custom hook to access authentication context
import SplashScreenView from '../components/SplashScreenView'; // SplashScreenView component
import { NavigationContainer } from '@react-navigation/native'; // container for managing navigation state

export default function AppNavigator() {
  const { isLoggedIn } = useAuth(); // current login status from the AuthContext
  const [initialRoute, setInitialRoute] = useState('StackNavigator'); // State variable to track the initial screen to show, Initial is 'StackNavigator'
  const [showSplash, setShowSplash] = useState(true); // State variable to track whether the splash screen is visible, default is true

  // This effect runs to check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn'); // Get the login status from local storage
      if (storedLoginStatus === 'true' || isLoggedIn) {
        // If stored login status is true or the user is currently logged in
        setInitialRoute('TabNavigator'); // Set the initial route to 'TabNavigator'
        console.log('Testing')
      } else {
        setInitialRoute('StackNavigator'); // Otherwise, set it to 'StackNavigator'
        console.log('Failed')
      }
    };
    checkLoginStatus(); // Call the function to check login status
  }, [isLoggedIn]); // This effect depends on the value of isLoggedIn, so it re-runs when isLoggedIn changes

  useEffect(() => {
    // This effect runs to hide the splash screen after 1 second
    const timeout = setTimeout(() => {
      setShowSplash(false); // After 1 second, set showSplash to false to hide the splash screen
    }, 500);

    return () => clearTimeout(timeout); // Clean up the timeout if the component is unmounted before 1 second
  }, []);

  return (
    <NavigationContainer>
      {showSplash ? ( // If showSplash is true, display the splash screen
        <SplashScreenView />
      ) : initialRoute === 'TabNavigator' ? ( // If showSplash is false, check initialRoute. If it's 'TabNavigator', display TabNavigator
        <TabNavigator />
      ) : (
        // If initialRoute is not 'TabNavigator', display StackNavigator
        <StackNavigator />
      )}
    </NavigationContainer>
  );
}
