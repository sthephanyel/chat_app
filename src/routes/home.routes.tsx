import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { AppTabBar } from "./tab.routes";
import Chat from "../screens/Home/screens/Chat";
import UserDetails from "../screens/Home/screens/UserDetails";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export type RootStackParamList = {
  home: undefined;
  chat: undefined;
  userdetails: undefined;
  AppTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function HomeRoutes({ navigation, route }: any) {

  const tabHiddenRoutes = [
    "chat",
    "userdetails"
  ];
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "home";
    console.log('routeName', routeName)
    // console.log('navigationRef', navigationRef?.current?.setOptions())
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none"} });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex"} });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: true }}
      initialRouteName={"home"}
    >
      <Stack.Screen name="home"options={{ headerShown: false }} component={Home} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="userdetails" component={UserDetails} />
    </Stack.Navigator>
  );
}
