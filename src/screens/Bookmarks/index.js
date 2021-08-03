import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const renderItem = item => {
    return (
      <>
        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={() =>
            navigation.navigate('Vocabulary', {vocabulary: item.item})
          }>
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
          <>
            <FlatList
              data={vocabularies}
              showsVerticalScrollIndicator={false}
              renderItem={item => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            {vocabularies.length > 0 ? (
              <TouchableWithoutFeedback onPress={() => clearAsyncStorage()}>
                <View style={styles.buttonClearBookmark}>
                  <Text style={styles.textButtonClear}>Clear Bookmark</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </>
        ) : null}

        {vocabularies?.length === 0 || !vocabularies ? (
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
