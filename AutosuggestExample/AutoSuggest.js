import React, {
  Component
} from 'React';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  View,

} from 'react-native';
import { debounce } from 'throttle-debounce';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      currentInput: null,


    };

  }

  setCurrentInput(currentInput) { this.setState({ currentInput }) }
  clearTerms() { this.setState({ results: [] }) }
  addAllTerms() { this.setState({ results: termsArr }) }
  searchTerms(currentInput) {
    this.setState({ currentInput });
    debounce(200, () => {
      const results = termsArr.filter((eachTerm => eachTerm.toLowerCase().indexOf(currentInput.toLowerCase()) > -1))
      this.setState({ results })
    })()
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
          <View>
            <ListView
              initialListSize={15}
              enableEmptySections
              dataSource={ds.cloneWithRows(this.state.results)}
              renderRow={(rowData, sectionId, rowId, highlightRow) =>
                <TouchableOpacity
                  activeOpacity={0.5 /* when you touch it the text color grimaces */}
                  style={styles.container}
                  onPress={() => this.setCurrentInput(this.state.results[rowId])}
                  >
                      <RowWrapper>
                        <Text style={{fontSize: 18, lineHeight: 30}}>{rowData}</Text>
                      </RowWrapper>
                </TouchableOpacity> }
              />
        </View>
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


class RowWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { opacity: new Animated.Value(0) }
  }
 componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
    }).start();
  }
  render() {
    return (
      <Animated.View style={[{opacity: this.state.opacity}, RowWrapperStyles.eachRow]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

const RowWrapperStyles = StyleSheet.create({
  eachRow: {
    paddingBottom: 5,
    paddingTop: 5,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1
  }
})