'use strict';
import {debounce} from 'throttle-debounce';
import React, {
  Component
} from 'React';
import {   
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  View, 
} from 'react-native';

const termsArr = [
  "Birthday", 
  "Graduation",
  "Anniversary",
  "Homecoming",
  "Confirmation",
  "Bar Mitzvah",
  "Baby Shower",
  "House Warming",
  "Secret Santa",
  "Chanukah"
];


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: termsArr,
      currentInput: null,

    };
  }
  setCurrentInput(currentInput) { this.setState({currentInput}) }
  clearTerms() { this.setState({results: []}) }
  addAllTerms() { this.setState({results: termsArr}) }
  searchTerms(currentInput) {
    this.setState({currentInput});
    debounce(200, () => {
      const results = termsArr.filter((eachTerm => eachTerm.toLowerCase().indexOf(currentInput.toLowerCase()) > -1))
      this.setState({results})
    })()
  }
  renderSeperator() {
      return (<View
        style={{
          flex: 1,
          height:  4,
          backgroundColor: '#3B5998'
        }}
      />)
  }
  render() {

    return (
      <View style={styles.container}>
        <TextInput 
            spellCheck={false}
            defaultValue={this.state.currentInput}
            onBlur={() => console.log('blur') /* this.clearTerms() */}
            onFocus={() => this.addAllTerms()}
            onChangeText={(el) => this.searchTerms(el)}
            placeholder="Gift"
            style={styles.text_input}
             />
        <ListView
          initialListSize={15}
          enableEmptySections
          renderSeperator={this.renderSeperator}
          dataSource={ds.cloneWithRows(this.state.results)}
          renderRow={(rowData, sectionId, rowId, highlightRow) => 
            <TouchableOpacity 
              activeOpacity={0.5}
              style={styles.container}
              onPress={(el) => {
                this.setCurrentInput('hello');
                this.setCurrentInput(this.state.results[rowId])
              }}>
              <View style={{opacity: 0.4, paddingBottom: 5, paddingTop: 5, borderColor: 'lightgrey', borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
                <Text style={{fontSize: 18, lineHeight: 30}}>{rowData}</Text>

                </View>
            </TouchableOpacity>}
         />
         </View>
    );
  
}
}

var styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: '#FFFFFF',
  },
  text_input: {
    backgroundColor: 'lightgrey',
    height: 40,
  }
});
