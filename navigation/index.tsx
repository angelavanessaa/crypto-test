import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import CrypColors from '../components/common/CrypColors';
import ChartScreen from '../screens/ChartScreen/ChartScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';

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
        <Stack.Screen
          name="Chart"
          component={ChartScreen}
          options={({ route }) => ({
            headerTitle: route.params?.coin?.pair.toLocaleUpperCase() ?? 'Chart',
            headerStyle: {
              backgroundColor: CrypColors.brandDark,
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: CrypColors.brandWhite,
            headerTitleStyle: {
              fontWeight: 'bold', // Set font weight for the title
            },
            headerBackTitle: 'Market',
          })}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={({ route }) => ({
            headerTitle: route.params?.coin?.pair.toLocaleUpperCase() ?? 'Order',
            headerStyle: {
              backgroundColor: CrypColors.brandDark,
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: CrypColors.brandWhite,
            headerTitleStyle: {
              fontWeight: 'bold', // Set font weight for the title
            },
            headerBackTitle: 'Chart',
          })}
        />
      </Stack.Navigator>
    </View>
  );
}

