import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../Views/Home';
import WorkoutMain from '../Views/Workout-Main';
import Timeline from '../Views/Timeline';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: '#fff',
  }
}

export default function Navbar() {
    return (
        <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Timeline" component={Timeline} options={
            {
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d" : "#111"} />
                    <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}>TIMELINE</Text>
                  </View>
                )
              }
            }
          } />
          <Tab.Screen name="Workout" component={WorkoutMain} options={
            {
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name="weight-lifter" size={24} color={focused ? "#16247d" : "#111"} />
                    <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}>WORKOUT</Text>
                  </View>
                )
              }
            }
          } />
          <Tab.Screen name="Food" component={WorkoutMain} options={
            {
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name="food-apple" size={24} color={focused ? "#16247d" : "#111"} />
                    <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}>FOOD</Text>
                  </View>
                )
              }
            }
          } />
          <Tab.Screen name="Sleep" component={WorkoutMain} options={
            {
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name="power-sleep" size={24} color={focused ? "#16247d" : "#111"} />
                    <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}>SLEEP</Text>
                  </View>
                )
              }
            }
          } />
        </Tab.Navigator>
      </NavigationContainer>
    );
}