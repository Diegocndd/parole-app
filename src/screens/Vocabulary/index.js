import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import GoBack from '../../components/GoBack';

import {getWordInfos} from '../../api';
import keys from '../../constants/storage';

const _ = require('lodash');
const Sound = require('react-native-sound');

import styles from './styles';

let qtdExamples = 0;
let qtdSynonyms = 0;
let urlSound;
let soundPhonetics;

const Vocabulary = props => {
  const navigation = useNavigation();
  const vocab = props.route.params.vocabulary;
  const definitions = vocab.meanings;
  const word = vocab.word;

  const [savedWord, setSavedWord] = useState(false);

  function containsObject(obj, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (_.isEqual(arr[i], obj)) {
        return i;
      }
    }
    return -1;
  }

  const updateLatestResearch = async () => {
    let latestResearch = await AsyncStorage.getItem(keys.latestResearch);
    latestResearch = JSON.parse(latestResearch);

    if (
      latestResearch.length < 3 &&
      containsObject(vocab, latestResearch) === -1
    ) {
      latestResearch.push(vocab);
      await AsyncStorage.setItem(
        keys.latestResearch,
        JSON.stringify(latestResearch),
      );
    } else if (
      latestResearch.length >= 3 &&
      containsObject(vocab, latestResearch) === -1
    ) {
      latestResearch.pop();
      latestResearch.unshift(vocab);
      await AsyncStorage.setItem(
        keys.latestResearch,
        JSON.stringify(latestResearch),
      );
    }
  };

  useEffect(() => {
    (async () => {
      let bookmarks = await AsyncStorage.getItem(keys.bookmarks);
      let index = containsObject(vocab, JSON.parse(bookmarks));

      if (index !== -1) {
        setSavedWord(true);
      }
    })();

    updateLatestResearch();
    qtdExamples = 0;
    qtdSynonyms = 0;
  });

  const existExamples = () => {
    let exist = false;

    definitions.map(e => {
      e.definitions.map(p => {
        if (p.example) {
          exist = true;
        }
      });
    });

    return exist;
  };

  const existSynonyms = () => {
    let exist = false;

    definitions.map(e => {
      e.definitions.map(p => {
        if (p.synonyms && p.synonyms[0]) {
          exist = true;
        }
      });
    });

    return exist;
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderDefinition = e => {
    return (
      <Text style={{marginTop: 10}}>
        {e.index + 1}.{' '}
        <Text style={{color: '#FF4444'}}>
          {capitalizeFirstLetter(e.item.partOfSpeech)}.
        </Text>
        {e.item.definitions.map(definition => {
          if (definition.definition) {
            return (
              <Text> {capitalizeFirstLetter(definition.definition)} </Text>
            );
          }
        })}
      </Text>
    );
  };

  const renderExamples = e => {
    return (
      <>
        {e.item.definitions.map(def => {
          if (def.example && qtdExamples < 11) {
            qtdExamples += 1;
            return (
              <Text>
                {'\u2022'} {capitalizeFirstLetter(def.example)}.
              </Text>
            );
          }
        })}
      </>
    );
  };

  const goToSynonym = async synonym => {
    getWordInfos(synonym)
      .then(data =>
        navigation.navigate('Vocabulary', {vocabulary: data.data[0]}),
      )
      .catch(error => console.log(error));
  };

  const renderSynonyms = e => {
    return (
      <>
        {e.item.definitions.map(def => {
          if (qtdSynonyms < 11 && def.synonyms && def.synonyms[0]) {
            qtdSynonyms += 1;
            return (
              <TouchableOpacity onPress={() => goToSynonym(def.synonyms[0])}>
                <Text style={{color: '#FF4444'}}>
                  {'\u203a'} {capitalizeFirstLetter(def.synonyms[0])}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </>
    );
  };

  const removeWordFromBookmark = async () => {
    try {
      let bookmarks = await AsyncStorage.getItem(keys.bookmarks);
      bookmarks = JSON.parse(bookmarks);
      const index = containsObject(vocab, bookmarks);
      if (index !== -1) {
        bookmarks.splice(index, 1);
      }
      setSavedWord(false);
      await AsyncStorage.setItem(keys.bookmarks, JSON.stringify(bookmarks));
    } catch (error) {
      console.log(error);
    }
  };

  const saveWord = async () => {
    if (!savedWord) {
      try {
        const bookmarks = await AsyncStorage.getItem(keys.bookmarks);
        if (bookmarks === null) {
          // First time
          const initialStorage = [vocab];
          await AsyncStorage.setItem(
            keys.bookmarks,
            JSON.stringify(initialStorage),
          );
        } else {
          const allBookmarks = JSON.parse(bookmarks);
          if (allBookmarks.indexOf(vocab) === -1) {
            allBookmarks.push(vocab);
            await AsyncStorage.setItem(
              keys.bookmarks,
              JSON.stringify(allBookmarks),
            );
          }
        }
        setSavedWord(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      removeWordFromBookmark();
    }
  };

  const playAudio = () => {
    if (typeof vocab.phonetics[0]?.audio !== 'undefined') {
      urlSound = vocab.phonetics[0].audio;
      soundPhonetics = new Sound(urlSound, null, e => {
        if (e) {
          console.log("Can't play audio!");
        } else {
          soundPhonetics.play();
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.wordContainer}>
        <GoBack titleScreen={'Search'} />
        <View style={styles.wordScreenContainer}>
          <Text style={styles.titleWord}>{word}</Text>
          <View style={styles.iconsMenu}>
            <TouchableOpacity>
              <Icon name="share-social" size={50} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => playAudio()}
              disabled={typeof vocab.phonetics[0]?.audio === 'undefined'}>
              <Icon
                name="play-circle"
                size={50}
                color="#FFF"
                style={{
                  opacity:
                    typeof vocab.phonetics[0]?.audio !== 'undefined' ? 1 : 0.5,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => saveWord()}>
              {savedWord ? (
                <Icon name="bookmark" size={50} color="#FFF" />
              ) : (
                <Icon name="bookmark-outline" size={50} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        style={styles.infosContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.headerInfos}>DEFINITION</Text>
          <FlatList
            data={definitions}
            renderItem={e => renderDefinition(e)}
            style={styles.subtext}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {existExamples() ? (
          <View>
            <Text style={styles.headerInfos}>EXAMPLES</Text>
            <FlatList
              data={definitions}
              renderItem={e => renderExamples(e)}
              style={styles.subtext}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
        {existSynonyms() ? (
          <View>
            <Text style={styles.headerInfos}>SYNONYMS</Text>
            <FlatList
              data={definitions}
              renderItem={e => renderSynonyms(e)}
              style={styles.synonymsContainer}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Vocabulary;
