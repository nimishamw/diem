import React from 'react';
import PropTypes from 'prop-types';

const Glossary = ({children}) => {
    return children;
};

Glossary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Glossary;
