/**
 * this component create button with react-native-elements
 * required props for this component:
 *  1: title,
 *  2: type: value for this props:{solid,outline,clear} default: solid,
 *  3: onPress: this props one function pass to ButtonRne component,
 */
import React from 'react';
import {View} from 'react-native'
import {Button} from 'react-native-elements';

function ButtonRne(props) {
  // console.log(props)
  return (
    <>
      <Button
        
        titleStyle={{ color: props.color }}
        title={props.title}
        type={props.type}
        onPress={props.onPress()}
      >
        
      </Button>
    </>
  );
}

export default ButtonRne;
