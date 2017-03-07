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
      onChangeText={(text) => console.log('input changing!')}
      terms={['Apple', 'Banana', 'Orange', 'Strawberry', 'Lemon', 'Cantaloupe', 'Peach', 'Mandarin', 'Date', 'Kiwi']}
      ...
    />


```

## Props
#### Mandatory
|  Prop  | Type | Optional | Default | Description  | Example |
|-------|-------|----------|---------|--------------|----------|
| onChangeText          | Function | false  |  (prop is manadatory)  |  fired when the input changes. | (ev) => console.log(event)
| terms                 | Array    | false  |  (prop is mandatory)   |  list of suggestions. |  ['Chicago', 'New York', 'San Francisco']
| onChangeTextDebounce  | Number   |  true |  300 |   |   |
#### Optional
* `onChangeTextDebounce` (__integer__, the minimum break *in milliseconds* that the onChangeText callback needs to take before firing again. **default is 200.**)
* `onItemPress` (__function__ fired when an item in the menu is pressed with that item's string value as the argument. You probably don't need this, and should just use onChangeText)
* `clearBtn` (__Array__ e.g.  only if you want a custom btn component `[<MyCustomClearButtonComponent />]` , **default is undefined**.)
* `clearBtnStyles` (__Object__)
* `containerStyles` (__Object__) applies to the entire application
* `placeholder` (__String__)
* `placeholderTextColor` (__String__)
* `otherTextInputProps` (__object__, check the [TextInput](https://facebook.github.io/react-native/docs/textinput.html) docs for the full list)
* `textInputStyles` (__Object__ applies to the TextInput component e.g {width: 400, backgroundColor: "black"})
* `rowWrapperStyles`(__Object__)
* `rowTextStyles` (__Object__)
