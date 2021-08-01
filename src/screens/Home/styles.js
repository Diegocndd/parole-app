import {StyleSheet, Dimensions} from 'react-native';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  titleApp: {
    fontSize: 60,
    color: '#FFF',
    fontFamily: 'Lora',
  },
  titleAppPhonetic: {
    color: '#FFF',
    fontFamily: 'Lora',
    fontSize: 30,
  },
  headerHome: {
    backgroundColor: '#FF4444',
    height: heightScreen / 2,
    width: widthScreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    zIndex: 1,
  },
  searchBox: {
    position: 'relative',
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingRight: 50,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: widthScreen * 0.85,
  },
  textInput: {
    color: '#FF4444',
    fontSize: 20,
  },
  textSearchBox: {
    color: '#FF4444',
    fontSize: 20,
    opacity: 0.7,
  },
  containerIconInput: {
    paddingHorizontal: 10,
  },
  iconInput: {
    opacity: 0.8,
  },
  footerHome: {
    backgroundColor: '#F0F0F0',
    height: heightScreen / 2,
    width: widthScreen,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 10,
    paddingTop: 50,
  },
  latestResearchTitle: {
    opacity: 0.7,
    fontSize: 17,
    marginBottom: 10,
  },
  scrollBoxWord: {
    marginBottom: 20,
  },
  containerBoxWord: {
    marginBottom: 10,
  },
  boxFlags: {
    width: widthScreen / 1.5,
    height: heightScreen / 7,
    marginBottom: 25,
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlags: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  flag: {
    height: 50,
    width: 50,
    zIndex: 1,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
  },
});

export default styles;
