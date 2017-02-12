# AutoSuggest TextInput Component


![alt tag](https://github.com/silesky/react-native-autosuggest/blob/259c32a3cec308e30994d708f4abeb33572ed6b9/demo.gif)

## Installation
* `npm install autosuggest --save`

___

## Example:
~~import { TextInput } from 'react-native'~~
`import AutoSuggest from 'react-native-autosuggest';`
```js
   <AutoSuggest
      onChangeText={(el) => console.log('input changing!')}
      terms={['Apple', 'Banana', 'Orange', 'Strawberry', 'Lemon', 'Cantaloupe', 'Peach', 'Mandarin', 'Date', 'Kiwi']}
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
* `clearBtnStyles` (__Object__)
* `terms` (__Array__  e.g. ['Chicago', 'New York', 'San Francisco'])
* `placeholder` (__String__ e.g. "Please enter a City.")
* `placeholderTextColor` (__string__)
* `otherTextInputProps` (__object__, check the [TextInput](https://facebook.github.io/react-native/docs/textinput.html) docs for the full list)
* `containerStyles` (__object__)
* `textInputStyles` (__Object__ applies to the TextInput component e.g {width: 400, backgroundColor: "black"})
* `containerStyles` (__Object__)
* `rowWrapperStyles`(__Object__)
* `rowTextStyles` (__Object__)