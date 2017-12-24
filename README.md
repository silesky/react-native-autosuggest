# AutoSuggest TextInput Component


![alt tag](https://raw.githubusercontent.com/silesky/react-native-autosuggest/259c32a3cec308e30994d708f4abeb33572ed6b9/demo.gif)

## Installation
* `npm install autosuggest --save`

___

## Example:

check the [index.ios.js](https://github.com/silesky/AutosuggestExample/blob/master/index.ios.js) in the example repo.

~~import { TextInput } from 'react-native'~~
`import AutoSuggest from 'react-native-autosuggest';`
```js
   <AutoSuggest
      onChangeText={(text) => console.log('input changing!')}
      terms={['Apple', 'Banana', 'Orange', 'Strawberry', 'Lemon', 'Cantaloupe', 'Peach', 'Mandarin', 'Date', 'Kiwi']}
      ...
    />

```

### Complex suggestions example:

You can also use a more complex set of 'term' items (taking the shape: `{ term: string, searchableID?: string, value?: any }`) allowing for search by a hidden ID, but also allowing the return of objects, etc rather than simply strings.

In the below example, we can take a list of fruits, some are just strings, the rest are objects, some with values, others with searchable ID values.

```js
   <AutoSuggest
      onChangeText={(fruit) => this.setState({fruit:null})}
      onItemPress={(fruit) => this.setState({fruit:fruit.value||fruit.term||fruit})}
      formatString={({term, searchableID}) => `${searchableID} | ${term}`}
      terms={[{term:'Apple', searchableID:'100'}, {term:'Banana', searchableID:'101'}, {term:'Orange', searchableID:'102'}, {term:'Strawberry', value:{name:'Strawberry', bestFruit:true}}, 'Lemon', 'Cantaloupe', 'Peach', 'Mandarin', 'Date', 'Kiwi']}
    />

```
As props, we use `onItemPress` to detect selection of an item so we can write the value of the item to state, and `onChangeText` to listen for a user typing, which in this case removes any selected item. `formatString` is only used when searching by ID, otherwise `term` is used. In this case, it is used to display `100 | Apple`, if a user were to type `100`, however the value it returns `onItemPress` will just be `Apple`.


## Props

|  Prop  | Type | Optional | Default | Description  |
|-------|-------|----------|---------|--------------|
| `onChangeText`          | Function | false  |  (prop is manadatory)  |  fired when the input changes. e.g (ev) => console.log(event)
| `terms`                 | Array    | false  |  (prop is mandatory)   |  list of suggestions. e.g ['Chicago', 'New York', 'San Francisco'] |
| `onChangeTextDebounce` | Number   |  true |  300 |  the minimum break *in milliseconds* that the onChangeText callback needs to take before firing again.   |
| `onItemPress` | Function | true |  undefined | fired when an item in the menu is pressed with that item's string value as the argument. This is useful for dealing with terms as objects, otherwise you should just use onChangeText
| `placeholder` | String | true | '' | e.g 'please enter a name' |
| `clearBtnStyles` | Object | true | ...see src | styles that go around your clear btn |
| `clearBtnVisibility` | Bool | true | false | is the clear input button visible? |
| `clearBtn` | Array | true | undefined |  only if you want a custom btn component | [<MyCustomClearButtonComponent />]|
| `containerStyles` | Object | true | ...see src | applies to the entire application |
| `placeholderTextColor` | String | true | 'lightgrey' | placeholder text color |
| `otherTextInputProps` | Object | true | undefined | check the [TextInput](https://facebook.github.io/react-native/docs/textinput.html) docs for the full list) |
| `textInputStyles` | Object | true | undefined | applies to the TextInput component e.g {width: 400, backgroundColor: "black"})
| `rowWrapperStyles` | Object | true | undefined | applies to the View around the dropdown |
| `rowTextStyles` | Object | true | undefined | applies the dropdown text
| `formatString` | Function | true | undefined | a function that outputs a string which takes a term object to format an item found using its `searchableID`
