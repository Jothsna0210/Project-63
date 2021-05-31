import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HomeScreen from './screens/homescreen';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}
