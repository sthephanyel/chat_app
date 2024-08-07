import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { AppTabBar } from "./tab.routes";

export type RootStackParamList = {
  home: undefined;
  AppTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function HomeRoutes() {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"home"}
    >
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}
