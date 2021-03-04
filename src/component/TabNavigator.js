import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather, Entypo, AntDesign    } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native'
import livros from '../screens/livros';
import favoritos from '../screens/favoritos';
import Add from '../screens/add-product-screen'
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const { Navigator, Screen } = createBottomTabNavigator();





function tabnavigator() {
  return (
    
   
 
    <Navigator

    
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontSize: 13,
          marginLeft: 16,
          
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#9FE6CF',
        inactiveTintColor: 'black',
        activeTintColor: '#32264d'
      }}
    >

      

      <Screen 
        name="livros" 
        component={livros}
        options={{
          tabBarLabel: ({ tintColor }) => <TouchableOpacity onPress={()=>navigation.navigate('livros', {date: new Date()})} style={{flex: 1, alignItems:'center', justifyContent: 'center'}}><Text>All</Text></TouchableOpacity>,
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather name="book-open" size={size} color={focused ? 'black' : color} />
            );
          }
        }}
      />

     

      <Screen 
        name="Chat" 
        component={favoritos}
        
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              
                  <Entypo name="chat" size={size} color={focused ? 'black' : color} />
              
              
            );
          }
        }}
      />

    
      
    </Navigator>
   
  )
}
const styles = StyleSheet.create({
	
	iconTabRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    
   
});
export default tabnavigator;