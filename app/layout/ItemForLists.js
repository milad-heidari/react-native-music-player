import React from 'react'
import PropTypes from 'prop-types';
import View from '../components/partials/View';
function ItemForLists({ children }) {
    return (
        <View
            styles=
            {{
                margin: 10,
                flexDirection: 'row',
            }}>
            {children}
        </View >
    )
}

ItemForLists.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default ItemForLists
