import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRoutes } from "./home.routes";
import Posts from "../screens/Posts";
import Contacts from "../screens/Contacts";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red'
      }}
    >
      <View 
        style={{
          width: 60, 
          height: 60, 
          justifyContent: "center", 
          alignItems: "center",
          // marginBottom: 20
        }}>
        <Text style={{color: '#000',  fontSize: 10, textAlign: "center"}}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export function AppTabBar() {

  return (
    <Tab.Navigator
      initialRouteName="homeNavigator"
    >
      <Tab.Screen
        name="homeNavigator"
        component={HomeRoutes}
        options={{
          headerShown: false,
          tabBarButton: (props) => <TabButton {...props} item={"home"} />,
        }}
      />
      <Tab.Screen
        name="posts"
        component={Posts}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="contacts"
        component={Contacts}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}
