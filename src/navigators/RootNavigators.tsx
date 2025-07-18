import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREENS, TAB } from '../enums';
import * as ui from '../screens'
import BottomNavigators from './BottomNavigators';

const RootNavigators = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={ui.LoginScreen} />
                <Stack.Screen name={SCREENS.DETAILS_SCREEN} component={ui.DetailsScreen} />
                <Stack.Screen name={TAB.BOTTOM_TAB} component={BottomNavigators} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigators

