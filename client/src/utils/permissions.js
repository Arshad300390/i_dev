import { Alert, PermissionsAndroid, Platform, Linking } from 'react-native';

export const androidCameraPermission = () =>
  new Promise(async (resolve) => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        let permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];

        // For Android 11 (API 30) and above, use the new media permissions (read only)
        // if (Platform.Version >= 30) {
        //   permissions.push(
        //     PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        //     PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
        //   );
        // } else {
        //   // For lower versions (API < 30), keep the old storage read permission
        //   permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        // }

        // Request multiple permissions
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        console.log(granted, 'the granted value');

        // Check if all requested permissions were granted
        const allGranted = Object.values(granted).every(
          (status) => status === PermissionsAndroid.RESULTS.GRANTED
        );

        // If any permission is denied, handle accordingly
        if (!allGranted) {
          const isNeverAskAgain = Object.keys(granted).some(
            (permission) => granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          );

          if (isNeverAskAgain) {
            Alert.alert(
              'Permission Required',
              'Some permissions were permanently denied. Please enable them in app settings.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ],
              { cancelable: true }
            );
          } else {
            Alert.alert(
              'Permission Required',
              'Please allow all permissions to continue.',
              [{ text: 'OK' }]
            );
          }

          return resolve(false);
        }

        return resolve(true);
      }

      return resolve(true); // iOS or lower than Android 6.0
    } catch (error) {
      console.log('Permission check error:', error);
      return resolve(false);
    }
  });
