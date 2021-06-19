import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundedButton from '../components/RoundedButton';
import fonts from '../../styles/fonts';

const concepts = [
  'Static type checking',
  'UI styling and component building',
  'State management',
  'Navigation',
  'API access',
  'Local push notifications',
];

const languagesFrameworksAndLibraries: {name: string; url: string}[] = [
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
  },
  {
    name: 'React Native',
    url: 'https://reactnative.dev/docs/getting-started',
  },
  {
    name: 'Redux Toolkit',
    url: 'https://redux-toolkit.js.org/introduction/getting-started',
  },
  {
    name: 'React Navigation',
    url: 'https://reactnavigation.org/docs/getting-started/',
  },
  {
    name: 'Axios',
    url: 'https://axios-http.com/docs/intro',
  },
];

/**
 * This screen displays information about this app.
 * Includes details about the technologies and concepts used to develop the application,
 * as well as information about the license credits.
 */
export default function AboutApp() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleText}>About application</Text>

        <Card style={styles.contentCard}>
          <Image
            style={styles.appIcon}
            source={require('../../assets/icon/icon-large.png')}
          />

          <Text style={[styles.appName, styles.centeredText]}>QuizMate</Text>

          <Text style={[styles.appVersion, styles.centeredText]}>1.0.0</Text>

          <Text style={[styles.appDescription, styles.centeredText]}>
            A simple quiz app demonstrating the use of core concepts and
            utilities in React Native development
          </Text>

          <View style={styles.linksRow}>
            <Pressable
              android_ripple={{color: 'lightgrey', borderless: false}}
              onPress={() =>
                Linking.openURL(
                  'https://github.com/SudeeraSJ/quizmate_react_native',
                )
              }
              style={styles.linkContainer}>
              <Icon name={'github'} color={'black'} style={styles.linkIcon} />
            </Pressable>
          </View>
        </Card>

        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>
            Development concepts covered in this project
          </Text>
          {concepts.map((value, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Icon
                name={'circle'}
                color={'blue'}
                style={styles.listItemIcon}
              />
              <Text style={styles.listItemText}>{value}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>
            Languages, Frameworks and libraries used
          </Text>
          {languagesFrameworksAndLibraries.map((value, index) => (
            <Pressable
              key={index}
              onPress={() => Linking.openURL(value.url)}
              android_ripple={{color: 'lightgrey', borderless: false}}>
              <View style={styles.listItemContainer}>
                <Icon
                  name={'circle'}
                  color={'blue'}
                  style={styles.listItemIcon}
                />
                <Text style={styles.listItemText}>{value.name}</Text>
              </View>
            </Pressable>
          ))}
        </Card>

        <Card style={styles.contentCard}>
          <Text style={styles.additionalText}>
            Additionally, ESLint and Prettier was used for Linting and Code
            Formatting
          </Text>
        </Card>

        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>Credits</Text>

          <Text style={styles.creditsTitle}>Application developed by</Text>
          <Text style={styles.creditsText}>
            Sudeera Sandaruwan Jayasinghe - Colombo, Sri Lanka
          </Text>
          <View style={styles.actionButton}>
            <RoundedButton
              filled={false}
              text={'View profile'}
              onclick={() =>
                Linking.openURL(
                  'https://www.linkedin.com/in/sudeerasandaruwan/',
                )
              }
            />
          </View>

          <Text style={styles.creditsTitle}>Application icon</Text>
          <Text style={styles.creditsText}>
            Designed by Freepik from flaticon.com
          </Text>
          <View style={styles.actionButton}>
            <RoundedButton
              filled={false}
              text={'View profile'}
              onclick={() =>
                Linking.openURL('https://www.flaticon.com/authors/freepik')
              }
            />
          </View>

          <Text style={styles.creditsTitle}>Application cover image</Text>
          <Text style={styles.creditsText}>
            Designed by dashu83 from freepik.com
          </Text>
          <View style={styles.actionButton}>
            <RoundedButton
              filled={false}
              text={'View profile'}
              onclick={() => Linking.openURL('https://www.freepik.com/dashu83')}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  titleText: {
    paddingBottom: 24,
    alignSelf: 'flex-start',
    fontFamily: fonts.bold,
    fontSize: 28,
  },
  contentCard: {
    marginBottom: 24,
  },
  appIcon: {
    marginTop: 16,
    alignSelf: 'center',
  },
  appName: {
    paddingTop: 24,
    fontFamily: fonts.bold,
    fontSize: 36,
  },
  appVersion: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
  appDescription: {
    paddingTop: 24,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: 'darkslategrey',
  },
  centeredText: {
    textAlign: 'center',
  },
  cardTitle: {
    fontFamily: fonts.medium,
    fontSize: 24,
    marginBottom: 24,
  },
  linksRow: {
    alignSelf: 'center',
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 16,
  },
  linkContainer: {
    height: 64,
    width: 64,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  linkIcon: {
    fontSize: 36,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    paddingVertical: 4,
    borderRadius: 16,
  },
  listItemText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'black',
    textAlignVertical: 'center',
    paddingStart: 8,
  },
  listItemIcon: {
    fontSize: 12,
    textAlignVertical: 'center',
  },
  additionalText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'crimson',
  },
  creditsTitle: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
  creditsText: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  actionButton: {
    marginTop: 8,
    marginBottom: 24,
    alignSelf: 'flex-end',
  },
});
