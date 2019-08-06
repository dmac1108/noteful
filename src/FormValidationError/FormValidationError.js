import React from 'react';
import PropTypes from 'prop-types';

export default function FormValidationError(props){
   return(
    <p>{props.message}</p>

   );
}

FormValidationError.propTypes = {
    message: PropTypes.string.isRequired,
}

