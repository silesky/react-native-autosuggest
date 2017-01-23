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
      isRemoving: null,


    };

  }

  setCurrentInput(currentInput) { this.setState({ currentInput }) }
  clearTerms() { this.setState({ results: [] }) }
  addAllTerms() { this.setState({ results: termsArr }) }
  searchTerms(currentInput) {
    this.setState({ currentInput });
    debounce(200, () => {
      const findMatch = (term1, term2) => term1.toLowerCase().indexOf(term2.toLowerCase()) > -1
      const results = termsArr.filter((eachTerm => {
          if (findMatch(eachTerm, currentInput)) return eachTerm
      }))
      console.log(results, this.state.results);
      this.setState({isRemoving: results.length ? results.length <= this.state.results.length : null})
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
                      <RowWrapper
                        isRemoving={this.state.isRemoving}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5 /* when you touch it the text color grimaces */}
                          style={styles.container}
                          onPress={() => this.setCurrentInput(this.state.results[rowId])}
                          >
                            <Text style={{fontSize: 18, lineHeight: 30}}>{rowData}</Text>
                          </TouchableOpacity>
                      </RowWrapper>
          }
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
    this.defaultRowHeight = 40;
    this.defaultTransitionDuration = 500;
    this.state = { 
      opacity: new Animated.Value(0),
      rowHeight: new Animated.Value(this.defaultRowHeight)
  }
  }
 componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.defaultTransitionDuration,
    }).start();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.isRemoving);
    // using ugly conditionals bc if nextProps is null, I want to do nothing
       if (nextProps.isRemoving === true) {
           this.onRemoving(nextProps.onRemoving);
       } else if (nextProps.isRemoving === false) {
           this.resetHeight(); // we need this for iOS because iOS does not reset list row style properties
       }
   }
   onRemoving(callback) {
       Animated.timing(this.state.rowHeight, {
           toValue  : 0,
           duration : this.defaultTransitionDuration, 
       }).start(callback);
   }
   resetHeight() {
       Animated.timing(this.state.rowHeight, {
           toValue  : this.defaultRowHeight,
           duration : 0
       }).start();
   }
  render() {
    return (
      <Animated.View style={[{
        height: this.state.rowHeight,
        opacity: this.state.opacity
        }, RowWrapperStyles.eachRow]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

const RowWrapperStyles = StyleSheet.create({
  eachRow: {
    paddingBottom: 5,
    paddingTop: 5,

  }
})