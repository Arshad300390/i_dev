import { DevSettings, NativeModules } from 'react-native';

const addDebugMenuItems = () => {
  DevSettings.addMenuItem('(*) Debug JS Remotely', () => {
    setTimeout(() => {
      NativeModules.DevSettings.setIsDebuggingRemotely(true);
    }, 0);
  });

  DevSettings.addMenuItem('(*) Stop Debugging', () => {
    setTimeout(() => {
      NativeModules.DevSettings.setIsDebuggingRemotely(false);
    }, 0);
  });
};

export const enableDebugging = () => {
  if (__DEV__) {
    setTimeout(addDebugMenuItems, 100);
  }
};
