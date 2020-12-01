import React, { useReducer } from 'react';
import Paper from './paper';
import PaperTools from './paper/PaperTools';
import History from './paper/History';
import Bind from './paper/Bind';
import { reducer, initialState } from './store/activeMimic/reducer';

export const ActiveMimicContext = React.createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ActiveMimicContext.Provider value={{ state, dispatch }}>
      <Paper />
      <PaperTools />
      <History />
      <Bind />
    </ActiveMimicContext.Provider>
  );
}

export default App;
