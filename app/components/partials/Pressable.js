import React from 'react'
import {Pressable as PressableComponent} from 'react-native';
import PropTypes from 'prop-types';
function Pressable({styles,children,onPress}) {
    return (
        <PressableComponent 
        style={styles}
        onPress={onPress}>
            {children}
        </PressableComponent>
    )
}

Pressable.propTypes = {
    styles:PropTypes.object.isRequired,
    onPress:PropTypes.func.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Pressable
