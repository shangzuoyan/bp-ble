import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BloodPressureProvider from './src/contexts/BloodPressureProvider';
import LogProvider from './src/contexts/LogProvider';

import History from './src/screens/History';
import Sync from './src/screens/Sync';
import Log from './src/screens/Log';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <LogProvider>
      <BloodPressureProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'History') {
                  iconName = focused ? 'ios-list' : 'ios-list';
                } else if (route.name === 'Sync') {
                  iconName = focused ? 'ios-sync' : 'ios-sync';
                } else if (route.name === 'Log') {
                  iconName = focused ? 'ios-recording' : 'ios-recording';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#F95700FF',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Sync" component={Sync} />
            <Tab.Screen name="Log" component={Log} />
          </Tab.Navigator>
        </NavigationContainer>
      </BloodPressureProvider>
    </LogProvider>
  );
};

export default App;
