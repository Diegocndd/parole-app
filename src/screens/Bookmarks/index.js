import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BoxWord from '../../components/BoxWord';
import GoBack from '../../components/GoBack';

import keys from '../../constants/storage';

import styles from './styles';

const Bookmarks = ({navigation}) => {
  const [vocabularies, setVocabularies] = useState(false);

  useEffect(() => {
    (async () => {
      let bookmarks = await AsyncStorage.getItem(keys.bookmarks);
      setVocabularies(JSON.parse(bookmarks));
    })();
  });

  const renderItem = item => {
    return (
      <>
        <TouchableOpacity style={styles.bookmarkContainer}>
          <BoxWord vocabulary={item.item} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.screenBookmarks}>
      <View style={styles.wordContainer}>
        <GoBack titleScreen={'Search'} />
        <View style={styles.wordScreenContainer}>
          <Text style={styles.titleWord}>bookmarks</Text>
        </View>
      </View>

      <View style={styles.bookmarkListContainer}>
        {vocabularies ? (
          <FlatList
            data={vocabularies}
            showsVerticalScrollIndicator={false}
            renderItem={item => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}

        {vocabularies?.length === 0 ? (
          <View style={styles.containerMessage}>
            <View>
              <Text style={styles.messageNoBookmark}>
                You do not have any{'\n'}saved words yet!
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Bookmarks;
