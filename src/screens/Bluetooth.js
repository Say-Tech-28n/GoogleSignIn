import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {useNavigation} from '@react-navigation/native';

const BleComponent = () => {
  const [manager, setManager] = useState(null);
  const [scanActive, setScanActive] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [error, setError] = useState(null);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [connectedDeviceName, setConnectedDeviceName] = useState(null);
  const [stepCount, setStepCount] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const bleManager = new BleManager();
    setManager(bleManager);

    if (Platform.OS === 'android') {
      requestPermissions();
    }

    return () => {
      bleManager.destroy();
    };
  }, []);

  useEffect(() => {
    if (manager) {
      const subscription = manager.onStateChange(state => {
        if (state === 'PoweredOn') {
          setBluetoothEnabled(true);
          console.log('Bluetooth is enabled');
        } else {
          setBluetoothEnabled(false);
          console.log('Bluetooth is off or unavailable');
        }
      }, true);

      return () => subscription.remove();
    }
  }, [manager]);

  const requestPermissions = async () => {
    try {
      const locationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );

      const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );

      if (
        locationPermission !== PermissionsAndroid.RESULTS.GRANTED ||
        bluetoothConnectPermission !== PermissionsAndroid.RESULTS.GRANTED ||
        bluetoothScanPermission !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permissions Required',
          'Please grant all required permissions.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startScan = () => {
    if (!bluetoothEnabled) {
      Alert.alert(
        'Bluetooth Off',
        'Please turn on Bluetooth to scan for devices.',
      );
      return;
    }

    if (manager) {
      setScanActive(true);
      setScannedDevices([]);
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.error('Scan error:', error);
          setError(error.message);
          setScanActive(false);
          return;
        }

        if (scannedDevice && scannedDevice.name) {
          setScannedDevices(prevDevices => {
            const existingDevice = prevDevices.find(
              d => d.id === scannedDevice.id,
            );
            if (existingDevice) {
              return prevDevices;
            }
            return [...prevDevices, scannedDevice];
          });
        }
      });
    } else {
      console.error('BleManager is not initialized');
    }
  };

  const stopScan = () => {
    if (manager) {
      manager.stopDeviceScan();
      setScanActive(false);
    }
  };

  const connectToDevice = async device => {
    stopScan();

    const deviceName = device.name || 'Unknown Device';

    console.log(
      `Attempting to connect to device: ${deviceName} (ID: ${device.id})`,
    );

    Alert.alert(
      'Connection Request',
      `Do you want to connect to ${deviceName}?`,
      [
        {
          text: 'Decline',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              console.log(`Connecting to device with ID: ${device.id}`);

              const connectedDevices = await manager.connectedDevices([]);
              const isConnected = connectedDevices.some(
                d => d.id === device.id,
              );
              if (isConnected) {
                console.log('Device is already connected');
                await manager.cancelDeviceConnection(device.id);
              }

              const connectedDevice = await manager.connectToDevice(device.id);
              console.log('Connected to device:', connectedDevice);

              await connectedDevice.discoverAllServicesAndCharacteristics();
              console.log('Device connected and services discovered');

              setConnectedDeviceName(deviceName);

              readStepData(connectedDevice);
            } catch (error) {
              console.error('Connection failed:', error);
              Alert.alert('Connection Failed', `Error: ${error.message}`);
              setError('Connection failed: ' + error.message);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const readStepData = async connectedDevice => {
    try {
      const services = await connectedDevice.services();
      console.log('Discovered services:', services);

      // Replace with your actual step service UUID
      const stepServiceUUID = '01000100-0000-1000-8000-009078563412';

      const stepService = services.find(
        service => service.uuid === stepServiceUUID,
      );
      if (!stepService) {
        throw new Error('Step service not found');
      }

      const characteristics = await stepService.characteristics();
      console.log('Discovered characteristics:', characteristics);

      const readableCharacteristics = characteristics.filter(
        characteristic => characteristic.isReadable,
      );
      if (readableCharacteristics.length === 0) {
        throw new Error('No readable characteristics found');
      }

      for (const characteristic of readableCharacteristics) {
        try {
          const stepData = await characteristic.read();
          const stepCount = parseInt(stepData.value, 16);

          console.log('Step data:', stepCount);

          setStepCount(stepCount);

          navigation.navigate('StepDataScreen', {
            stepCount: stepCount.toString(),
          });
          break; // Break after successfully reading the first readable characteristic
        } catch (error) {
          console.error(
            `Failed to read characteristic ${characteristic.uuid}:`,
            error,
          );
        }
      }
    } catch (error) {
      console.error('Failed to read step data:', error);
      Alert.alert('Failed to Read Step Data', `Error: ${error.message}`);
    }
  };

  const keyExtractor = item => {
    return item.id || `${item.id}-${item.name || 'Unknown'}`;
  };

  return (
    <View style={{padding: 20}}>
      <Text>Bluetooth</Text>

      {error && <Text style={{color: 'red'}}>{error}</Text>}

      <Button
        title={scanActive ? 'Scanning...' : 'Start Scan'}
        onPress={scanActive ? stopScan : startScan}
        disabled={scanActive}
      />

      <FlatList
        data={scannedDevices}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <View style={{marginVertical: 10}}>
            <Text>Device: {item.name || 'Unknown'}</Text>
            <Button title="Connect" onPress={() => connectToDevice(item)} />
          </View>
        )}
      />

      {scanActive && <ActivityIndicator size="large" color="#0000ff" />}

      {connectedDeviceName && <Text>Connected to: {connectedDeviceName}</Text>}
      {stepCount !== null && (
        <Text>
          Step Count: {stepCount !== null ? stepCount.toString() : 'N/A'}
        </Text>
      )}
    </View>
  );
};

export default BleComponent;
