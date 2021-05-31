import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: '',
      definition: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexiCalcategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexiCalcategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: 'white', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.bt}> Search </Text>
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.dt}>Word:{""} </Text>
          <Text style={styles.text}>{this.state.word}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.dt}>Type:{""} </Text>
          <Text style={styles.text}>{this.state.lexicalCategory}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.dt}>Definition:{""} </Text>
          <Text style={styles.text}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    margin: 20,
    marginBottom: 10,
    marginTop: 50,
  },
  button: {
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#e53de5',
    marginBottom: 30,
  },
  bt: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  details: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 10,
    marginBottom:0
  },
  dt:{
    fontWeight:'bold',
    color:'orange',
  },
  text:{
    fontWeight:'bold',
    color:'purple'
  }
});
