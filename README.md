# AutoSuggest Text Input


![alt tag](https://github.com/silesky/react-native-autosuggest/blob/259c32a3cec308e30994d708f4abeb33572ed6b9/demo.gif)

## Installation
* `npm install autosuggest --save`

___

## Example:
```js
import AutoSuggest from 'react-native-autosuggest';

<AutoSuggest
      rowTextStyles={{backgroundColor: 'darkblue', color: 'white'}}
      terms={["Apple", "Banana", "Orange", "Strawberry", "Lemon", "Cantaloupe", "Peach", "Mandarin", "Date", "Kiwi"]}
      placeholder="select a fruit."
      textInputStyles={{backgroundColor: 'black', color: 'white'}}
      onChangeText={(el) => console.log('changing text!', el)}
      onChangeTextDebounce={200}
      clearBtnVisibility={true}
      ...
    />
```

## Props:
Refer to React's [TextInput](https://facebook.github.io/react-native/docs/textinput.html) documentation for more information on `placeholder` and `onChangeText`.
Refer to the source code for more information about the rest.

* `onChangeText` (__function__, fired when the input changes.)
* `onChangeTextDebounce` (__integer__, the minimum break *in milliseconds* that the onChangeText callback needs to take before firing again. **default is 0.**)
* `onItemPress` (__function__ fired when an item in the menu is pressed with that item's string value as the argument. You probably don't need this, and should just use onChangeText)
* `clearBtn` (__Array__ e.g. [[<MyCustomClearButtonComponent />]  -- only if you want a custom btn component, **default is undefined**.)
* `terms` (__Array__  e.g. ['Chicago', 'New York', 'San Francisco'])
* `placeholder` (__String__ e.g. "Please enter a City.")
### Styles
* `clearBtnStyles` (__Object__ e.g. {backgroundColor: "white", flex: 2})
* `textInputStyles` (__Object__ e.g. {width: 400, backgroundColor: "black"})
* `containerStyles` (__Object__ e.g. {flex: 2})
* `rowWrapperStyles`

## Todo:
* ~~pass a custom component for the "clear" button~~
