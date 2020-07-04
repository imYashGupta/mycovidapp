import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import {THEME} from "../util/THEME";
import WorldScreen, { ScreenOptions as WorldScreenOptions } from "../screens/WorldScreen";
import StatsScreen, { ScreenOptions as StatsScreenOptions } from "../screens/StatsScreen";
import AboutScreen, { ScreenOptions as AboutScreenOptions} from '../screens/AboutScreen';
import DistrictScreen, { ScreenOptions as DistrictScreenOptions} from '../screens/DistrictScreen';
import DistrictStats, { ScreenOptions as DistrictStatsOptions} from '../screens/DistrictStats';
import UpdatesScreen, { ScreenOptions as UpdatesScreenOptions} from '../screens/UpdatesScreen';
import TimelineScreen, { ScreenOptions as TimelineScreenOptions} from '../screens/TimelineScreen';
import TestScreen, { ScreenOptions as TestScreenOptions} from '../screens/TestScreen';

//screens
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
                <Stack.Screen name="TimelineScreen" component={TimelineScreen} options={TimelineScreenOptions} />
                <Stack.Screen name="WorldScreen" component={WorldScreen} options={WorldScreenOptions} />
                <Stack.Screen name="StatsScreen" component={StatsScreen} options={StatsScreenOptions} />
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={AboutScreenOptions} />
                <Stack.Screen name="DistrictScreen" component={DistrictScreen} options={DistrictScreenOptions} />
                <Stack.Screen name="DistrictStats" component={DistrictStats} options={DistrictStatsOptions} />
                <Stack.Screen name="UpdatesScreen" component={UpdatesScreen} options={UpdatesScreenOptions} />
                <Stack.Screen name="TestScreen" component={TestScreen} options={{headerShown:false}} />
 
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;