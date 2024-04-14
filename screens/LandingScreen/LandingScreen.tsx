import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab/HomeTab';
import MarketTab from './MarketTab/MarketTab';
import CrypColors from '../../components/common/CrypColors';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const tabOptions = {
  headerStyle: { 
    backgroundColor: CrypColors.brandDark,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: () => <View />,
}

export default function LandingScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: CrypColors.brandDark
        },
        tabBarItemStyle: {
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: CrypColors.brandTeal,
        tabBarInactiveTintColor: CrypColors.brandGrey,
        tabBarHideOnKeyboard: true,
        headerStatusBarHeight: 0
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={tabOptions}
      />
      <Tab.Screen name="Market" component={MarketTab} options={tabOptions} />
    </Tab.Navigator>
  );
}