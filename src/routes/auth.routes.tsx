import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

export type RootStackParamList = {
  login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"login"}
    >
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
