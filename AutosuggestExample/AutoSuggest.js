/* EXAMPLE !!!!!!!!!!!!!!!!!!!!!!!! */
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
    this.listHeight = 40;
    this.state = {
      results: [],
      currentInput: null,
      isRemoving: null,
      listHeight: new Animated.Value(this.listHeight)
    }
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

      this.setState({isRemoving: results.length < this.state.results.length})
      this.setState({ results })
    })()
  }
  onRemoving() {
       Animated.timing(this.state.listHeight, {
           toValue  : this.listHeight * this.state.results.length - 1,
           duration : 1000, 
       }).start();
  }
  
  render() {
    return (

      <View style={AppContainerStyles.container}>
          <TextInput
              spellCheck={false}
              defaultValue={this.state.currentInput}
              onBlur={() => this.clearTerms() }
              onFocus={() => this.addAllTerms()}
              onChangeText={(el) => this.searchTerms(el)}
              placeholder="Gift"
              style={AppContainerStyles.text_input}
              />
          <Animated.View>
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
                          style={AppContainerStyles.container}
                          onPress={() => this.setCurrentInput(this.state.results[rowId])}
                          >
                            <Text style={{fontSize: 18, lineHeight: 30}}>{rowData}</Text>
                          </TouchableOpacity>
                      </RowWrapper>
          }
              />
        </Animated.View>
    </View>

    );

  }
}

const AppContainerStyles = StyleSheet.create({
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
  
    this.defaultTransitionDuration = 500;
    this.state = { 
      opacity: new Animated.Value(0),
    }
  }
 componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.defaultTransitionDuration,
    }).start();
  }
 componentWillReceiveProps() {
   if (this.props.isRemoving) {
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 0.75,
        duration: 100,
      }),
      Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      })
    ]).start();
   }
 }

  render() {
    return (
      <Animated.View style={[{
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