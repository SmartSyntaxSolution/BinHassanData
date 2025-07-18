import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../enums';
import * as ui from '../screens';
import { IMAGES } from '../assets/images';
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const renderTabIcon = (
  focused: boolean,
  activeIcon: any,
  inactiveIcon: any,
  size: number = 24
) => (
  <Image
    source={focused ? activeIcon : inactiveIcon}
    style={{ width: size, height: size, resizeMode: 'contain' }}
  />
);

const BottomNavigators = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const { role }: any = route.params;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {
        role === 'admin' ?
          <>
            <Tab.Screen
              name={SCREENS.HOME_SCREEN}
              component={ui.HomeScreen}
              options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_DASHBOARD, IMAGES.BLACK_DASHBOARD),
              }}
              initialParams={{ role }}
            />

            <Tab.Screen
              name={SCREENS.ADD_RECORD_SCREEN}
              component={ui.AddRecordScreen}
              options={{
                tabBarLabel: 'Add Record',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_ADD_BUTTON, IMAGES.BLACK_ADD_BUTTON),
              }}
              initialParams={{ role }}

            />
            <Tab.Screen
              name={SCREENS.ADD_WORKERS_SCREEN}
              component={ui.AddWorkers}
              options={{
                tabBarLabel: 'Add Workers',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.ADD_WORKER_BLUE, IMAGES.ADD_WORKER_BLACK),
              }}
              initialParams={{ role }}

            />
            <Tab.Screen
              name={SCREENS.COMPLETE_RECORDS_LIST}
              component={ui.CompleteRecordsList}
              options={{
                tabBarLabel: 'Records List',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_LIST, IMAGES.BLACK_LIST),
              }}
              initialParams={{ role }}

            />
          </>

          :
          <>
            <Tab.Screen
              name={SCREENS.HOME_SCREEN}
              component={ui.HomeScreen}
              options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_DASHBOARD, IMAGES.BLACK_DASHBOARD),
              }}
              initialParams={{ role }}
            />

            <Tab.Screen
              name={SCREENS.ADD_RECORD_SCREEN}
              component={ui.AddRecordScreen}
              options={{
                tabBarLabel: 'Add Record',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_ADD_BUTTON, IMAGES.BLACK_ADD_BUTTON),
              }}
              initialParams={{ role }}

            />

            <Tab.Screen
              name={SCREENS.COMPLETE_RECORDS_LIST}
              component={ui.CompleteRecordsList}
              options={{
                tabBarLabel: 'Records List',
                tabBarIcon: ({ focused }) =>
                  renderTabIcon(focused, IMAGES.BLUE_LIST, IMAGES.BLACK_LIST),
              }}
              initialParams={{ role }}

            />
          </>

      }

    </Tab.Navigator>
  );
};

export default BottomNavigators;
