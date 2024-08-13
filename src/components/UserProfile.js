import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Modal, Button
} from 'react-native';
import { launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { PermissionsAndroid, Platform } from 'react-native'; // Ensure PermissionsAndroid is correctly imported
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

// Responsive Code
const { width, height } = Dimensions.get('window');
const responsiveWidth = percentage => {
  return Math.round((percentage * width) / 100);
};
const responsiveHeight = percentage => {
  return Math.round((percentage * height) / 100);
};

// Function Started
const UserProfile = () => {
  const [userFirstName, setUserFirstName] = useState(null);//to set firstName in Async
  const [userLastName, setUserLastName] = useState(null);//to set lastName in Async
  const [userEmail, setUserEmail] = useState(null);//to set Email in Async
  const [imageUri, setImageUri] = useState(null);//to set Profile Image in Async
  const [value, setValue] = useState(0);//to Set Level of Happiness, Neutral & Stressed
  const [isModalVisible, setModalVisible] = useState(false);
  // Function to request camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  // Profile Image Selection Functions Code Start
  // Function to handle image selection
  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        saveImage(uri);
      }
    });
  };
  // Function to handle image capture
  const captureImage = () => {
    launchCamera({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        saveImage(uri);
      }
    });
  };
  // Profile Image Selection Functions Code End

  // Function to Set image to AsyncStorage
  const saveImage = async uri => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
    } catch (error) {
      console.error('Failed to save image to AsyncStorage', error);
    }
  };

  // Function's to Get user Data and Image from AsyncStorage
  useEffect(() => {
    requestCameraPermission();
    // Function's to Get user Image
    const loadImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setImageUri(savedImageUri);
        }
      } catch (error) {
        console.error('Failed to load image from AsyncStorage', error);
      }
    };
    loadImage(); //Func Call to Get User Image
    // Function's to Get user Data
    const fetchUserData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('userFirstName');
        const lastName = await AsyncStorage.getItem('userLastName');
        const email = await AsyncStorage.getItem('userEmail');

        if (firstName && lastName && email) {
          setUserFirstName(firstName);
          setUserLastName(lastName);
          setUserEmail(email);
        } else {
          console.log('No user First & Last Name found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user First & Last Name from AsyncStorage:', error);
      }
    };
    fetchUserData(); //Func Call to Get User First & Last Name
  }, []);

  // Function to get the Face's Image Baed on Slider value
  const getFaceImage = () => {
    if (value < 0.33) {
      return 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTQzLTAxXzEucG5n.png'; // Replace with actual image URL
    } else if (value < 0.66) {
      return 'https://static.thenounproject.com/png/4106723-200.png'; // Replace with actual image URL
    } else {
      return 'https://img.freepik.com/premium-vector/anxiety-cartoon-emotion-stressed-face-comic-expression_53562-16425.jpg'; // Replace with actual image URL
    }
  };

  return (
    <LinearGradient
      style={styles.mainContainer}
      colors={[
        'rgba(253, 229, 0, 0.5)',
        'rgba(18, 17, 17, 0.1)',
        'rgba(18, 17, 17, 0.5)',
        'rgba(18, 17, 17, 1)',
      ]}>
      <SafeAreaView style={styles.Container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImg}
            source={imageUri ? { uri: imageUri } : require('./profile.png')}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              name="pencil"
              style={styles.pencilIcon}
              size={24}
            />
          </TouchableOpacity>

          {userFirstName && userLastName && userEmail && (
            <View>
              <Text style={styles.userNameTxt}>
                {`${userFirstName} ${userLastName}`}
              </Text>
            </View>
          )}

          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Button title="Capture from Camera" onPress={captureImage} />
              <Button title="Choose from Gallery" onPress={selectImage} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>
        <View style={styles.activitiesContainer}>
          {/* Other containers and views */}
          <View style={styles.sleepContainer}>
            <ImageBackground
              style={styles.waveBg}
              source={require('./WavesBg.png')}>
              <View style={styles.overlayContainer}>
                <View style={styles.leftContainer}>
                  <Image source={require('./sleep.png')} />
                </View>
                <View style={styles.centerContainer}>
                  <Text style={styles.txtSleep}>Sleep</Text>
                  <Text style={styles.txtSleep2}>9h 08m</Text>
                  <Text style={styles.txtSleep3}>of 8h Sleep</Text>
                </View>
                <View style={styles.rightContainer}></View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.sleepContainer}>
            <ImageBackground
              style={styles.waveBg}
              source={require('./WavesBg.png')}>
              <View style={styles.overlayContainer}>
                <View style={styles.leftContainer}>
                  <Image source={require('./health.png')} />
                </View>
                <View style={styles.centerContainer}>
                  <Text style={styles.txtSleep}>Blood Pressure (bpm)</Text>
                  <Text style={styles.txtSleep2}>130/90</Text>
                  <Text style={styles.txtSleep3}>15 min ago</Text>
                </View>
                <View style={styles.rightContainer}>{/* Graph */}</View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.dividedContainer}>
            <View style={styles.lContainer}>
              <View style={styles.mood}>
                <Text style={styles.txtMood}>Mood</Text>
                <Text style={styles.txtFeel}>Feeling</Text>
              </View>
              <View style={styles.emoji}></View>
            </View>
            <View style={styles.rContainer}>
              <ImageBackground
                style={{ flex: 1 }}
                source={require('./Vector.png')}
              />
            </View>
          </View>
          <View style={styles.levelContainer}>
            <ImageBackground
              style={{ width: '100%' }}
              source={require('./WavesBg.png')}>
              <View style={styles.container}>
                <Text style={styles.title}>Stress Level</Text>
                <Image source={{ uri: getFaceImage() }} style={styles.face} />
                <Text style={styles.moodText}>
                  {value < 0.33
                    ? 'Happy'
                    : value < 0.66
                      ? 'Neutral'
                      : 'Stressed'}
                </Text>
                <LinearGradient
                  colors={[
                    '#FF3B00',
                    '#FFCD4C',
                    '#FFC83F',
                    '#22EEB1',
                    '#BFFFE8',
                    '#916FD0',
                  ]}
                  end={{ x: 0, y: 0 }}
                  start={{ x: 1, y: 0 }}
                  style={styles.Sliderbg}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="white"
                    thumbTintColor="#000"
                    value={value}
                    onValueChange={setValue}
                  />
                </LinearGradient>
              </View>
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    flex: 1,
    maxWidth: '95%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTxt: {
    color: '#FFFFFF',
    fontSize: responsiveWidth(5),
    fontFamily: 'Unbounded-Black',
    textAlign: 'center',
  },
  profileImg: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderColor: '#FDE500',
    borderWidth: 5,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  activitiesContainer: {
    width: '95%',
    height: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(35, 33, 24, 1)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sleepContainer: {
    width: '90%',
    height: '20%',
    backgroundColor: 'rgba(47, 47, 47, 1)',
  },
  overlayContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftContainer: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: '80%',
    height: '100%',
  },
  txtSleep: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
    marginRight: 50,
  },
  txtSleep2: {
    fontSize: 25,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
  },
  txtSleep3: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  dividedContainer: {
    width: '90%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lContainer: {
    backgroundColor: '#2F2F2F',
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
  },
  mood: {
    width: '65%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMood: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'WorkSans-BoldItalic',
    marginRight: 35,
  },
  txtFeel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  emoji: {
    width: '35%',
    height: '100%',
  },
  rContainer: {
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#2F2F2F',
  },
  Vector: {
    flex: 1,
    resizeMode: 'cover',
  },
  levelContainer: {
    width: '90%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#2F2F2F',
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
  face: {
    width: 50,
    height: 40,
    marginBottom: 10,
  },
  moodText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 10,
  },
  Sliderbg: {
    height: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  //
  pencilIcon: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    borderRadius: 100,
    padding: 5,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
    margin: 'auto',
    width: '80%',
    borderRadius: 25

  }
});

export default UserProfile;
