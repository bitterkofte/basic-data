import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import NextScreen from '../screens/NextScreen';
import AuthScreen from '../screens/AuthScreen';
import { ColorContext } from '../context/color-context';
import ListScreen from '../screens/ListScreen';

const NavCenter = () => {
  const CCX = useContext(ColorContext);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={'AuthScreen'} component={AuthScreen} options={{contentStyle: {backgroundColor: 'white'}, headerShown: false}} />
      <Stack.Screen name={'NextScreen'} component={NextScreen} options={{contentStyle: {backgroundColor: 'white'}}} />
      <Stack.Screen name={'ListScreen'} component={ListScreen} options={{contentStyle: {backgroundColor: 'white'}}} />
    </Stack.Navigator>
  )
}

export default NavCenter

const styles = StyleSheet.create({})