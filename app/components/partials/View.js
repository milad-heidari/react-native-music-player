import React from 'react'
import PropTypes from 'prop-types';
import {View as ViewComponent} from 'react-native';
function View({children,styles}) {
    return (
        <ViewComponent style={styles}>
            {children}
        </ViewComponent>
    )
}

View.propTypes={
    styles:PropTypes.object.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default View
