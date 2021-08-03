import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const BoxWord = props => {
  const navigation = useNavigation();

  const {word} = props.vocabulary;
  let definition = '';

  if (props.vocabulary.meanings) {
    definition = props.vocabulary.meanings[0].definitions[0].definition;
  }

  return (
    <>
      <View style={styles.boxWordContainer}>
        <View style={styles.stickWordContainer} />
        <View style={styles.boxWordDefinition}>
          <Text style={styles.titleWord}>{word?.toUpperCase()}</Text>
          <Text style={styles.definitionWord}>
            {definition?.substring(0, 60) + '...'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default BoxWord;
