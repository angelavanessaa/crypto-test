import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import { View } from 'react-native';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import CrypColors from '../components/common/CrypColors';
import ChartScreen from '../screens/ChartScreen/ChartScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName={'Landing'}>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chart" component={ChartScreen} />
      </Stack.Navigator>
    </View>
  );
}

