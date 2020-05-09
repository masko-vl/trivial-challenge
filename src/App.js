import React from 'react';
import MyProvider from './context/MyProvider';

import GameLogic from './components/GameLogic/GameLogic';

function App() {
  
  return (
    <MyProvider>
      <GameLogic></GameLogic>
    </MyProvider>
  );
}

export default App;
