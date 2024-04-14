import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import Reactotron from './Reactotron';
import Toast from 'react-native-toast-message';

if (__DEV__) {
  Reactotron.connect();
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <Toast />
    </SafeAreaProvider>
  );
}
