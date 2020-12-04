import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './database';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      lexicalCategory: '',
      definition: '',
      word: '',
      examples: null,
      isButtonPressed: false
    }
  }
  getWord = (text) => {
    let wurd = text.toLowerCase();
    try {
      let word = dictionary[wurd]["word"];
      let lexicalCategory = dictionary[wurd]["word"];
      let definition = dictionary[wurd]["definition"];
      this.setState({
        "word": word,
        "lexicalCategory": lexicalCategory,
        "definition": definition
      });
    } catch (err) {
      alert("Word Not Found!");
      this.setState({
        "text": '',
        "isSearchPressed": false
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'book', color: '#fff' }}
          centerComponent={{ text: 'Dictionary App', style: { color: '#fff' } }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter any word here'
            onChangeText={(text) => {
              this.setState({
                text: text,
                word: "Loading...",
                lexicalCategory: '',
                examples: [],
                definition: ""
              });
            }}
            value={this.state.text}
          />
          <TouchableOpacity onPress={() => { this.setState({ isSearchPressed: true }); this.getWord(this.state.text) }} >
            <Image source={require('./assets/searchicon.png')} style={styles.search} />
          </TouchableOpacity>
        </View>
        <Text>Word: {this.state.word}</Text>
        <Text>Type: {this.state.lexicalCategory}</Text>
        <Text>Definition: {this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 9,
    height: 50,
    marginTop: 30,
    width: 346
  },
  search: {
    width: 40,
    height: 40,
    marginTop: 37
  }
});
