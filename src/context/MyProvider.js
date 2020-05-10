import React, { useState } from 'react';



export const MyContext = React.createContext();

const MyProvider = (props) => {
  const [state, changeState] = useState({
    timer:false
  });

  return (
    <MyContext.Provider value={{
      state,
      restartTimer: (timer) => changeState({timer:timer})
      }}>
      {props.children}
    </MyContext.Provider>
  );
};



export default MyProvider;
