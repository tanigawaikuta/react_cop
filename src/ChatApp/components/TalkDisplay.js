import { useContext } from 'react';
import { CallState } from '../ChatApp';

function TalkDisplay({ className }) {
    const { state, dispatch } = useContext(CallState); 

    return (
        <div className={className}>
            <div>Talking to {state.talker}</div>
            <button onClick={() => dispatch({ type: "TALK" })}>End Call</button>
        </div>
    )
}

export default TalkDisplay;
