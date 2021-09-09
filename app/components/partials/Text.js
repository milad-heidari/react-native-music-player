import React from 'react'
import {Text as TextComponent} from 'react-native';
function Text({styles,text}) {
    return (
        <TextComponent style={styles}>
            {text}
        </TextComponent>
    )
}

export default Text
