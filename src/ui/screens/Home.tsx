import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchCategories} from '../../api/repos/category-repo';
import {TaskProgress} from '../../types/util-types';
import {StackScreenProps} from '@react-navigation/stack';
import {RootNavigatorTypes} from '../../types/navigation-types';
import RoundedButton from '../components/RoundedButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../styles/fonts';

type Props = StackScreenProps<RootNavigatorTypes, 'Home'>;

/**
 * This is the opening screen of the application that will displayed to the user.
 * Once the trivia categories are successfully loaded into the state, allows the user to proceed and create a quiz.
 *
 * @param navigation The navigation instance passed down from the navigation container.
 */
export default function Home({navigation}: Props) {
  const dispatch = useAppDispatch();
  const taskProgress = useAppSelector(state => state.categories.progress);

  /**
   * Listens to the internet connectivity status changes of the device.
   * Once the internet connection is active, calls to fetch trivia categories.
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        dispatch(fetchCategories());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <ImageBackground
          source={require('../../assets/cover/cover-portrait.jpg')}
          imageStyle={styles.backgroundImageBorders}
          style={styles.backgroundImage}
          blurRadius={2.5}>
          <Pressable
            style={styles.aboutIconContainer}
            onPress={() => navigation.navigate('AboutApp')}>
            <Icon name={'information'} size={32} color={'white'} />
          </Pressable>

          <View style={styles.appIconContainer}>
            <Image
              style={styles.appIcon}
              source={require('../../assets/icon/icon-cover.png')}
              resizeMethod={'resize'}
              resizeMode={'center'}
            />
          </View>

          <Text style={styles.appName}>QuizMate</Text>
        </ImageBackground>
      </View>

      <View style={styles.contentArea}>
        {taskProgress !== TaskProgress.SUCCESS ? (
          <View>
            <ActivityIndicator size="large" color="blue" />
            <Text style={styles.loadingText}>setting things up</Text>
          </View>
        ) : (
          <RoundedButton
            text={'Start a new Quiz'}
            onclick={() => navigation.navigate('QuizCreator')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  backgroundImageContainer: {
    flex: 8,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    flex: 8,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    resizeMode: 'stretch',
    elevation: 10,
  },
  backgroundImageBorders: {
    borderRadius: 25,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  appIcon: {
    top: 64,
  },
  aboutIconContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
    paddingEnd: 16,
    elevation: 20,
    zIndex: 20,
  },
  appIconContainer: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  appName: {
    flex: 3,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignSelf: 'stretch',
    color: 'white',
    fontSize: 48,
    fontFamily: fonts.medium,
  },
  contentArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    top: 8,
  },
});
