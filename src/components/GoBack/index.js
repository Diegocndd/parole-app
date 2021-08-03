import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const widthScreen = Dimensions.get('window').width;

const GoBack = props => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.backScreenContainer}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={37} color="#FFF" />
        <Text style={styles.searchButton}>{props.titleScreen}</Text>
      </TouchableOpacity>
    </>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  backScreenContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    width: widthScreen / 2,
  },
  searchButton: {
    color: 'white',
    fontSize: 20,
  },
});
