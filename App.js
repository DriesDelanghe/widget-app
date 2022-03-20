import {View} from 'react-native';
import React from "react";
import {QuotesProvider} from "./Components/contexts/QuotesContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {HOMESCREEN, SETTINGS} from "./navigationNames";
import {HomeScreen} from "./Components/Screens/Homescreen";
import {useNavigation} from "@react-navigation/core";
import {Icon} from "react-native-elements";
import {SettingsScreen} from "./Components/Screens/SettingsScreen";



export default function App() {

    const Stack = createNativeStackNavigator()

    return (
        <QuotesProvider>
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name={HOMESCREEN} component={HomeScreen} options={{
                    headerTitle: () => null,
                    headerRight: () => <SettingsIcon/>
                }} />
                <Stack.Screen name={SETTINGS} component={SettingsScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
        </QuotesProvider>
    );
}

export const SettingsIcon = () => {

    const navigation = useNavigation()

    return(
        <View>
            <Icon type={'feather'} name={"settings"}
            onPress={() => navigation.navigate(SETTINGS)}/>
        </View>
    )
}
