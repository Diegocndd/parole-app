import {StyleSheet, Dimensions} from 'react-native';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screenBookmarks: {
    flex: 1,
  },
  wordContainer: {
    backgroundColor: '#FF4444',
    height: heightScreen * (1 / 3),
    elevation: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
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
  titleWord: {
    color: 'white',
    fontSize: 55,
    fontFamily: 'Lora',
    textAlign: 'center',
  },
  wordScreenContainer: {
    justifyContent: 'space-around',
    height: '80%',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  bookmarkListContainer: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  bookmarkContainer: {
    marginBottom: 12,
  },
  messageNoBookmark: {
    textAlign: 'center',
    fontFamily: 'Lora',
    fontSize: 26,
    opacity: 0.7,
    marginBottom: 100,
  },
  containerMessage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
