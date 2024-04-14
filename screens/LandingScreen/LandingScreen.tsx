import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab/HomeTab';
import MarketTab from './MarketTab/MarketTab';
import CrypColors from '../../components/common/CrypColors';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CrypText from '../../components/common/CrypText';

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
        options={{
          ...tabOptions,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketTab}
        options={tabOptions}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="line-chart" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}