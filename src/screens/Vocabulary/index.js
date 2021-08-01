import React from 'react';
import {View} from 'react-native';

const Vocabulary = props => {
  console.log(props.route.params.vocabulary);
  return <View></View>;
};

export default Vocabulary;
