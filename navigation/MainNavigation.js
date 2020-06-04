import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import {THEME} from "../util/THEME";
import StateScreen, { ScreenOptions as StateScreenOptions } from "../screens/IndiaScreen";
import WorldScreen, { ScreenOptions as WorldScreenOptions } from "../screens/WorldScreen";
import StatsScreen, { ScreenOptions as StatsScreenOptions } from "../screens/StatsScreen";
import EssentialsScreen, { ScreenOptions as EssentialsScreenOptions } from "../screens/EssentialsScreen";
import AboutScreen, { ScreenOptions as AboutScreenOptions} from '../screens/AboutScreen';
import DistrictScreen, { ScreenOptions as DistrictScreenOptions} from '../screens/DistrictScreen';
import DistrictStats, { ScreenOptions as DistrictStatsOptions} from '../screens/DistrictStats';

//screens
import HomeScreen,{ScreenOptions as HomeScreenOptions} from "../screens/HomeScreen";
const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator screenOptions={
                {
                    ...TransitionPresets.SlideFromRightIOS,
                    headerStyle:{
                        backgroundColor: THEME.DARK,
                        elevation:0,
                    },
                    headerTintColor:"white",
                }
            }>
                <Stack.Screen name="Home" component={HomeScreen} options={HomeScreenOptions} />
                <Stack.Screen name="StateScreen" component={StateScreen} options={StateScreenOptions} />
                <Stack.Screen name="WorldScreen" component={WorldScreen} options={WorldScreenOptions} />
                <Stack.Screen name="StatsScreen" component={StatsScreen} options={StatsScreenOptions} />
                <Stack.Screen name="EssentialsScreen" component={EssentialsScreen} options={EssentialsScreenOptions} />
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={AboutScreenOptions} />
                <Stack.Screen name="DistrictScreen" component={DistrictScreen} options={DistrictScreenOptions} />
                <Stack.Screen name="DistrictStats" component={DistrictStats} options={DistrictStatsOptions} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;