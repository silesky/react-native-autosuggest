import React, { Component, PropTypes } from 'react'
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
  Button
} from 'react-native'
import { debounce } from 'throttle-debounce'
import { version } from 'react-native/package.json';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class AutoSuggest extends Component {
  static propTypes = {
    otherTextInputProps: PropTypes.object,
    placeholder: PropTypes.string, // textInput
    placeholderTextColor: PropTypes.string,
    onChangeTextDebounce: PropTypes.number,
    onItemPress: PropTypes.func,
    onChangeText: PropTypes.func,
    rowTextStyles: PropTypes.object,
    rowWrapperStyles: PropTypes.object,
    containerStyles: PropTypes.object,
    textInputStyles: PropTypes.object, // I guess a reference to the stylesheet. should be an object but its not.
    terms: PropTypes.array,
    clearBtnVisibility: PropTypes.bool
  }

  static defaultProps = {
    onChangeTextDebounce: 0,
    clearBtnVisibility: false
  }
  getInitialStyles() {
    const { 
      textInputStyles: 
      { backgroundColor }
    } = this.props;
    const defaultBgColor = 'white';
    return {
      rowWrapperStyles: {
        zIndex: 999,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        opacity: 0.8,
        borderTopColor: 'lightgrey',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
      },
      rowTextStyles: {

      },
      clearBtnStyles: {

      },
      containerStyles: {
        zIndex: 999,
        width: 300,
        backgroundColor: backgroundColor ? backgroundColor: defaultBgColor
      },
      textInputStyles: { // textInput Styles
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        alignItems: 'center',
        height: 40
      }
    }
  }
  constructor(props) {
    super(props)
    this.clearTerms = this.clearTerms.bind(this)
    this.searchTerms = this.searchTerms.bind(this)
    this.setCurrentInput = this.setCurrentInput.bind(this)
    this.onRemoving = this.onRemoving.bind(this)
    this.onItemPress = this.onItemPress.bind(this)
    this.listHeight = 40
    this.state = {
      TIWidth: null,
      results: [],
      currentInput: null,
      isRemoving: null,
      listHeight: new Animated.Value(this.listHeight)
    }
  }
  componentDidMount() {
    // when user hits the return button, clear the terms
    Keyboard.addListener('keyboardDidHide', () => this.clearTerms())
  }

  getAndSetWidth() {
    this.refs.TI.measure((ox, oy, width, ...rest) => {
      this.setState({ TIWidth: width });
    })

  }
  setCurrentInput(currentInput) {
    this.setState({ currentInput })
  }

  clearInputAndTerms() {
    this.refs.TI.clear()
    this.clearTerms()
  }
  clearTerms() { this.setState({ results: [] }) }
  addAllTerms() { this.setState({ results: this.props.terms }) }
  searchTerms(currentInput) {
    this.setState({ currentInput })

    debounce(300, () => {
      this.getAndSetWidth();
      const findMatch = (term1, term2) => term1.toLowerCase().indexOf(term2.toLowerCase()) > -1
      const results = this.props.terms.filter(eachTerm => {
        if (findMatch(eachTerm, currentInput)) return eachTerm
      })
      this.setState({ isRemoving: results.length < this.state.results.length })
      const inputIsEmpty = !!(currentInput.length <= 0)
      this.setState({ results: inputIsEmpty ? [] : results }) // if input is empty don't show any results
    })()
  }
  onRemoving() {
    Animated.timing(this.state.listHeight, {
      toValue: this.lisHeight * this.state.results.length - 1,
      duration: 1000
    }).start()
  }

  // copy the value back to the input
  onItemPress(currentInput) {
    this.setCurrentInput(currentInput)
    this.clearTerms()
  }
  getCombinedStyles(styleName) {
    let styleObj;
    if (typeof this.props.styleName !== 'object') { // this is if its a stylesheet reference
      styleObj = StyleSheet.flatten([this.getInitialStyles()[styleName], this.props[styleName]])
    } else {
      // combine the  initial i.e default styles into one object.
      styleObj = {...this.getInitialStyles()[styleName], ...this.props[styleName] }
    }
    return styleObj;
  }
  render() {
    const {
      onChangeText,
      otherTextInputProps,
      placeholder,
      placeholderTextColor,
      clearBtn,
      clearBtnVisibility,
      onChangeTextDebounce,
      onItemPress,
      textInputStyles,
    } = this.props;
    return (
      <View style={this.getCombinedStyles('containerStyles')}>
      <View 
      ref="TIContainer"
      style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
              {...otherTextInputProps}
              placeholderTextColor={placeholderTextColor}
              ref="TI"
              spellCheck={false}
              defaultValue={this.state.currentInput}
              onChangeText={(el) => {
                this.searchTerms(el)
                if (typeof onChangeText === 'function') debounce(onChangeTextDebounce, () => onChangeText(el))
              }}
              placeholder={placeholder}
              style={this.getCombinedStyles('textInputStyles')}
              />

            { clearBtn // for if the user just wants the default clearBtn
              ? <TouchableOpacity onPress={() => this.clearInputAndTerms()}>
                { clearBtn }
              </TouchableOpacity>
            : false }

            { !clearBtn && clearBtnVisibility // for if the user passes a custom btn comp.
              ? <Button style={this.getCombinedStyles('clearBtnStyles')} title="Clear" onPress={() => this.clearInputAndTerms()} />
              : false
            }
         </View>
         <View>
            <ListView style={{ position: 'absolute', width: this.state.TIWidth,backgroundColor: 'white', zIndex: 3}}
              keyboardShouldPersistTaps={version >= '0.4.0' ? 'always' : true}
              initialListSize={15}
              enableEmptySections
              dataSource={ds.cloneWithRows(this.state.results)}
              renderRow={(rowData, sectionId, rowId, highlightRow) =>
                      <RowWrapper
                        styles={this.getCombinedStyles('rowWrapperStyles')}
                        isRemoving={this.state.isRemoving}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5 /* when you touch it the text color grimaces */}
                          onPress={() => {
                            this.onItemPress(this.state.results[rowId])
                            if (onItemPress) onItemPress(this.state.results[rowId])
                          }
                        }
                          >
                            <Text style={this.getCombinedStyles('rowTextStyles')}>{rowData}</Text>
                          </TouchableOpacity>
                      </RowWrapper>
          }
              />
              </View>

    </View>

    )
  }

}

class RowWrapper extends Component {
  constructor(props) {
    super(props)

    this.defaultTransitionDuration = 500
    this.state = {
      opacity: new Animated.Value(0)
    }
  }
  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.defaultTransitionDuration
    }).start()
  }
  componentWillReceiveProps() {
    if (this.props.isRemoving) {
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0.75,
          duration: 100
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 200
        })
      ]).start()
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <Animated.View style={{...this.props.styles, opacity: this.state.opacity, }}>
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}