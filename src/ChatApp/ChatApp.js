import React, { createContext, useReducer } from 'react'
import './App.css';
import InputField from './InputField';
import Chat from './components/Chat';

export const CallState = createContext();
const reducer = (state, action) => {
    switch(action.type) {
        case "CALL":
            return { isRinging: !state.isRinging, isTalking: state.isTalking, talker: state.talker, caller: action.payload };
        case "TALK":
            return { isRinging: state.isRinging, isTalking: !state.isTalking, talker: state.caller, caller: state.caller };
        default:
            return state;
    };
};


function ChatApp() {
  const [state, dispatch] = useReducer(reducer, { isRinging: false, isTalking: false});

  return (
    <div className="App">
      <CallState.Provider value={{ state, dispatch }}>
        <InputField dispatch={dispatch}/>
        <Chat state={state}/>
      </CallState.Provider>
    </div>
  );
};

export default ChatApp;
