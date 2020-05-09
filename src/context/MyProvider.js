import React, { useState } from 'react';
import PropTypes from 'prop-types';


export const MyContext = React.createContext();
const MyProvider = (props) => {
  const [state, changeState] = useState({
    students: 'categio'
  });

  return (
    <MyContext.Provider value={{
      state
    }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

MyContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MyProvider;
