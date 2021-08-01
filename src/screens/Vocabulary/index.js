import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Vocabulary = props => {
  const navigation = useNavigation;
  const vocab = props.route.params.vocabulary;

  return (
    <View>
      <Text>{vocab.word}</Text>
      <Text>{vocab.origin}</Text>
    </View>
  );
};

export default Vocabulary;
