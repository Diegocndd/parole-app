import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const BoxWord = props => {
  const navigation = useNavigation();

  const {word} = props.vocabulary[0];
  const {definition} = props.vocabulary[0].meanings[0].definitions[0];

  return (
    <>
      <TouchableOpacity
        style={styles.boxWordContainer}
        onPress={() => navigation.navigate('Vocabulary', {vocabulary: props})}>
        <View style={styles.stickWordContainer} />
        <View style={styles.boxWordDefinition}>
          <Text style={styles.titleWord}>{word.toUpperCase()}</Text>
          <Text style={styles.definitionWord}>{definition}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BoxWord;
