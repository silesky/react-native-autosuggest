/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import AutoSuggest from './AutoSuggest';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AutosuggestExample extends Component {
  render() {
    return (
      <View style={{flex: 1, marginTop: 50, alignItems: 'center'}}>
        <AutoSuggest />
      </View>
    );
  }
}



AppRegistry.registerComponent('AutosuggestExample', () => AutosuggestExample);
