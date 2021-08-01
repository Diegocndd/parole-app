import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Bookmarks from './src/screens/Bookmarks';
import Vocabulary from './src/screens/Vocabulary';

import {Provider} from 'react-redux';
import {Store} from './src/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Bookmarks" component={Bookmarks} />
          <Stack.Screen name="Vocabulary" component={Vocabulary} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
