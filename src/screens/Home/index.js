import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLanguage} from '../../store/ducks/language';
import {getWordInfos} from '../../api';
import opacityFlag from '../../constants/opacityFlag';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import BoxWord from '../../components/BoxWord';
import languages from '../../constants/languages';
import styles from './styles';
import keys from '../../constants/storage';

const getLatestResearch = async () => {
  await AsyncStorage.getItem(keys.latestResearch);
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [gettingWord, setGettingWord] = useState(false);
  const [lowOpacityFlag, setLowOpacityFlag] = useState(null);
  const [latestResearch, setLatestResearch] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem(keys.latestResearch);
      if (!result) {
        await AsyncStorage.setItem(keys.latestResearch, JSON.stringify([]));
      } else {
        setLatestResearch(JSON.parse(result));
      }
    })();
  });

  const getWord = async word => {
    setGettingWord(true);
    getWordInfos(word)
      .then(data => {
        setGettingWord(false);
        navigation.navigate('Vocabulary', {vocabulary: data.data[0]});
      })
      .catch(error => {
        setGettingWord(false);
        console.log(error);
        Alert.alert(
          'Word not found',
          'Could not find the word! Check that it is written correctly.',
          [{text: 'OK'}],
        );
      });
  };

  return (
    <View>
      {gettingWord ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size={110} color={'#fff'} />
          <Text style={styles.textSearching}>Searching Vocabulary</Text>
        </View>
      ) : (
        <>
          <View style={styles.headerHome}>
            <TouchableOpacity
              style={styles.bookmark}
              onPress={() => navigation.navigate('Bookmarks')}>
              <Icon name="bookmark" size={45} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.titleApp}>Parole</Text>
            <Text style={styles.titleAppPhonetic}>/pa'Rɔl/</Text>
            <View style={styles.boxFlags}>
              <View style={styles.rowFlags}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.BR_PORTUGUESE));
                    setLowOpacityFlag(opacityFlag.BR_PORTUGUESE);
                  }}>
                  <Image
                    source={require('../../../img/brazil-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.BR_PORTUGUESE
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.FRENCH));
                    setLowOpacityFlag(opacityFlag.FRENCH);
                  }}>
                  <Image
                    source={require('../../../img/france-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.FRENCH
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.SPANISH));
                    setLowOpacityFlag(opacityFlag.SPANISH);
                  }}>
                  <Image
                    source={require('../../../img/spain-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.SPANISH
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rowFlags}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.RUSSIAN));
                    setLowOpacityFlag(opacityFlag.RUSSIAN);
                  }}>
                  <Image
                    source={require('../../../img/russia-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.RUSSIAN
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.ITALIAN));
                    setLowOpacityFlag(opacityFlag.ITALIAN);
                  }}>
                  <Image
                    source={require('../../../img/italy-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.ITALIAN
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(languages.USA));
                    setLowOpacityFlag(opacityFlag.USA);
                  }}>
                  <Image
                    source={require('../../../img/usa-flag.png')}
                    style={[
                      styles.flag,
                      {
                        opacity:
                          lowOpacityFlag === opacityFlag.USA
                            ? 0.5
                            : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchBox}>
              <View style={styles.containerIconInput}>
                <Icon
                  name="search"
                  size={30}
                  color="#FF4444"
                  style={styles.iconInput}
                />
              </View>
              <TextInput
                placeholder="Search vocabulaire"
                onSubmitEditing={e => getWord(e.nativeEvent.text)}
                placeholderTextColor={'#FF4444'}
                style={styles.textInput}
              />
            </View>
          </View>

          {latestResearch && latestResearch.length > 0 ? (
            <View style={styles.footerHome}>
              <Text style={styles.latestResearchTitle}>LATEST RESEARCH</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollBoxWord}>
                {latestResearch.map(vocab => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Vocabulary', {vocabulary: vocab})
                      }>
                      <View style={styles.containerBoxWord}>
                        <BoxWord vocabulary={vocab} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default Home;
