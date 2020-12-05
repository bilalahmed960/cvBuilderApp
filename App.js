import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import CreateCv from './screens/CreateCv'
import Constants from 'expo-constants'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const myOptions={
    title:"Dashboard",
    headerTintColor:"white",
    headerStyle:{backgroundColor:"#006aff"
    }
}
const Stack = createStackNavigator();
 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator >
        <Stack.Screen 
        name="Home" 
        component={Home}  
        options={myOptions} />
        <Stack.Screen name="Create" component={CreateCv} options={{...myOptions,title:"Create Cv"}}/>
        <Stack.Screen name="Profile" component={Profile} options={{...myOptions,title:"My Cv"}}/>
    </Stack.Navigator>
      {/* <Home /> */}
      {/* <CreateCv /> */}
      {/* <Profile /> */}
  
    </View>
  );
}

export default ()=>{
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    marginTop:Constants.statusBarHeight
  }
});
