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

  const mock1 = [{"word":"word","phonetics":[{"text":"/wərd/","audio":"https://lex-audio.useremarkable.com/mp3/word_us_1.mp3"}],"meanings":[{"partOfSpeech":"transitive verb","definitions":[{"definition":"Choose and use particular words in order to say or write (something)","synonyms":["phrase","express","put","couch","frame","set forth","formulate","style"],"example":"he words his request in a particularly ironic way"}]},{"partOfSpeech":"noun","definitions":[{"definition":"A single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed.","synonyms":["term","name","expression","designation","locution"],"example":"I don't like the word “unofficial”"},{"definition":"A command, password, or signal.","synonyms":["instruction","order","command"]},{"definition":"One's account of the truth, especially when it differs from that of another person."},{"definition":"The text or spoken part of a play, opera, or other performed piece; a script.","synonyms":["script","text"]},{"definition":"A basic unit of data in a computer, typically 16 or 32 bits long."}]},{"partOfSpeech":"exclamation","definitions":[{"definition":"Used to express agreement."}]}]}];
  const mock2 = [{"word":"love","phonetics":[{"text":"/ləv/","audio":"https://lex-audio.useremarkable.com/mp3/love_us_1.mp3"}],"meanings":[{"partOfSpeech":"transitive verb","definitions":[{"definition":"Feel deep affection for (someone)","synonyms":["be in love with","be infatuated with","be smitten with","be besotted with","be passionate about"],"example":"he loved his sister dearly"},{"definition":"Like or enjoy very much.","synonyms":["like very much","delight in","enjoy greatly","have a passion for","take great pleasure in","derive great pleasure from","have a great liking for","be addicted to","relish","savour"],"example":"I just love dancing"}]},{"partOfSpeech":"noun","definitions":[{"definition":"An intense feeling of deep affection.","synonyms":["deep affection","fondness","tenderness","warmth","intimacy","attachment","endearment"],"example":"babies fill parents with feelings of love"},{"definition":"A great interest and pleasure in something.","synonyms":["liking","weakness","partiality","bent","leaning","proclivity","inclination","disposition"],"example":"his love for football"},{"definition":"A person or thing that one loves.","synonyms":["beloved","loved one","love of one's life","dear","dearest","dear one","darling","sweetheart","sweet","sweet one","angel","honey"],"example":"she was the love of his life"},{"definition":"(in tennis, squash, and some other sports) a score of zero; nil.","example":"love fifteen"}]}]}];
  const mock3 = [{"word":"order","phonetics":[{"text":"/ˈɔrdər/","audio":"https://lex-audio.useremarkable.com/mp3/order_us_1.mp3"}],"meanings":[{"partOfSpeech":"verb","definitions":[{"definition":"Give an authoritative direction or instruction to do something.","synonyms":["instruct","command","direct","enjoin","give the order to","give the command to","tell","require","charge","adjure"],"example":"she ordered me to leave"},{"definition":"Request (something) to be made, supplied, or served.","synonyms":["request","apply for","send away for","send off for","write off for","put in an order for","place an order for","requisition"],"example":"my friend ordered the tickets last week"},{"definition":"Arrange (something) in a methodical or appropriate way.","synonyms":["organize","put in order","set in order","arrange","sort out","straighten out","marshal","dispose","lay out","regulate"],"example":"all entries are ordered by date"}]},{"partOfSpeech":"noun","definitions":[{"definition":"The arrangement or disposition of people or things in relation to each other according to a particular sequence, pattern, or method.","synonyms":["sequence","arrangement","organization","disposition","structure","system","series","succession"],"example":"I filed the cards in alphabetical order"},{"definition":"An authoritative command, direction, or instruction.","synonyms":["command","instruction","directive","direction","decree","edict","injunction","mandate","dictate","commandment"],"example":"he was not going to take orders from a mere administrator"},{"definition":"A particular social, political, or economic system.","synonyms":["system","class system","hierarchy","pecking order","grouping","grading","ranking","scale"],"example":"if only the peasantry would rise up against the established order"},{"definition":"A society of monks, priests, nuns, etc., living according to certain religious and social regulations and discipline and at least some of whose members take solemn vows.A society of knights bound by a common rule of life and having a combined military and monastic character.An institution founded by a monarch for the purpose of conferring an honor or honors for merit on those appointed to it.The insignia worn by members of an order of honor or merit.A Masonic or similar fraternal organization.","synonyms":["community","brotherhood","sisterhood"],"example":"the Franciscan Order"},{"definition":"The quality, nature, or importance of something.","synonyms":["type","kind","sort","nature","variety","ilk","genre","cast","style","brand","vintage"],"example":"with musical talent of this order, von Karajan would have been a phenomenon in any age"},{"definition":"A principal taxonomic category that ranks below class and above family.","synonyms":["taxonomic group","class","subclass","family","species","breed"]},{"definition":"Any of the five classical styles of architecture (Doric, Ionic, Corinthian, Tuscan, and Composite) based on the proportions of columns, amount of decoration, etc.","example":"Work out for yourself the differences between Corinthian, Ionic and Doric orders."},{"definition":"Equipment or uniform for a specified purpose or of a specified type.","example":"drill order"},{"definition":"The degree of complexity of an equation, expression, etc., as denoted by an ordinal number.","example":"The transient equations for the second orders of the identity coefficients are too complicated to solve."}]}]}];

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
                {/* <View style={styles.containerBoxWord}>
                  <BoxWord vocabulary={mock1} />
                </View>
                <View style={styles.containerBoxWord}>
                  <BoxWord vocabulary={mock2} />
                </View>
                <View style={styles.containerBoxWord}>
                  <BoxWord vocabulary={mock3} />
                </View> */}
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
