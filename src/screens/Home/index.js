import React from 'react';
import {Text, View, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="BOOKMARKS"
        onPress={() => navigation.navigate('Bookmarks')}
      />
    </View>
  );
};

export default Home;
