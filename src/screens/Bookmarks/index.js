import React from 'react';
import {Text, View, Button} from 'react-native';

const Bookmarks = ({navigation}) => {
  return (
    <View>
      <Text>Bookmarks</Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Bookmarks;
