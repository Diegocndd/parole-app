import {StyleSheet, Dimensions} from 'react-native';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wordContainer: {
    backgroundColor: '#FF4444',
    height: heightScreen * (1 / 3),
    elevation: 10,
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
  iconsMenu: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthScreen / 1.8,
    marginTop: 15,
  },
  infosContainer: {
    paddingTop: 10,
    height: '100%',
    paddingLeft: 30,
    paddingRight: 20,
    marginBottom: 50,
  },
  headerInfos: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
  },
  subtext: {
    marginLeft: 15,
  },
  synonymsContainer: {
    marginLeft: 15,
    flexDirection: 'column',
  },
});

export default styles;
