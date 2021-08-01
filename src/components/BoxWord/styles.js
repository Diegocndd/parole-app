import {StyleSheet, Dimensions} from 'react-native';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  titleWord: {
    fontSize: 18,
    color: '#000',
  },
  definitionWord: {
    fontSize: 13,
    color: '#000',
    marginTop: 6,
  },
  boxWordContainer: {
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    flexDirection: 'row',
    width: widthScreen * 0.7,
  },
  stickWordContainer: {
    backgroundColor: '#9c9c9c',
    width: 7,
    height: 100,
  },
  boxWordDefinition: {
    paddingHorizontal: 10,
    paddingRight: 15,
  },
});

export default styles;
