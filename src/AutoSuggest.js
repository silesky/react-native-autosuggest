import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { debounce } from 'throttle-debounce';
const rnVersion = require('react-native/package.json').version;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })


export default class AutoSuggest extends Component {
static propTypes = {
    TextInputStyles: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    terms: React.PropTypes.array,
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.clearTerms = this.clearTerms.bind(this);
    this.searchTerms = this.searchTerms.bind(this);
    this.setCurrentInput = this.setCurrentInput.bind(this);
    this.onRemoving = this.onRemoving.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.listHeight = 40;
    this.state = {
      results: this.props.terms,
      currentInput: null,
      isRemoving: null,
      listHeight: new Animated.Value(this.listHeight)
    };

  }
    componentDidMount() {
      // when user hits the return button, clear the terms
      Keyboard.addListener('keyboardDidHide', () => this.clearTerms())
    }
    
  setCurrentInput(currentInput) { 
    this.setState({ currentInput }) 
    }

  clearInputAndTerms() { 
    this.refs.TI.clear(); 
    this.clearTerms();
  }  
  clearTerms() { this.setState({ results: [] }) }
  addAllTerms() { this.setState({ results: this.props.terms }) }
  searchTerms(currentInput) {
    this.setState({currentInput});
    debounce(300, () => {
      const findMatch = (term1, term2) => term1.toLowerCase().indexOf(term2.toLowerCase()) > -1
      const results = this.props.terms.filter((eachTerm => {
          if (findMatch(eachTerm, currentInput)) return eachTerm
      }))
      this.setState({isRemoving: results.length < this.state.results.length})
      const inputIsEmpty = !!(currentInput.length <= 0)
      this.setState({results: inputIsEmpty ? []  : results}) // if input is empty don't show any results
    })()
    
  }
  onRemoving() {
       Animated.timing(this.state.listHeight, {
           toValue  : this.listHeight * this.state.results.length - 1,
           duration : 1000, 
       }).start();
  }
  
  // copy the value back to the input
  onItemClick(currentInput) {
    this.setCurrentInput(currentInput);
    this.clearTerms();
  }
  render() {
    return (
      <View style={{
          width: 300,
          backgroundColor: 'white'
        }}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
              ref="TI"
              spellCheck={false}
              defaultValue={this.state.currentInput}
              onChangeText={(el) => this.searchTerms(el)}
              placeholder="Please Enter a Gift."
              style={{
                backgroundColor: 'lightgrey',
                height: 40,
                paddingLeft: 5,
                paddingRight: 5,
                flex: 5
            }}
              />
              <Button title="Clear" onPress={() => this.clearInputAndTerms()} />
              </View>
          <Animated.View >
            <ListView
              keyboardShouldPersistTaps={rnVersion >="0.4.0" ? "always" : true}
              initialListSize={15}
              enableEmptySections
              dataSource={ds.cloneWithRows(this.state.results)}
              renderRow={(rowData, sectionId, rowId, highlightRow) =>  
                      <RowWrapper                      isRemoving={this.state.isRemoving}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5 /* when you touch it the text color grimaces */}
                          onPress={() => this.onItemClick(this.state.results[rowId])}
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
         <TouchableWithoutFeedback>
        <Animated.View style={[{
        paddingLeft: 5,
        paddingRight: 5,
        opacity: this.state.opacity
        }, RowWrapperStyles.eachRow]}
      >
    
  
        {this.props.children}

     
             </Animated.View>
               </TouchableWithoutFeedback>
    )
  }
}

const RowWrapperStyles = StyleSheet.create({
  eachRow: {
    paddingBottom: 5,
    paddingTop: 5,
  }
})
