import { useContext } from 'react';
import { CallState } from '../ChatApp';

function RingDisplay({ className }) {
    const { state, dispatch } = useContext(CallState); 

    return (
        <div className={className}>
            <p>{state.caller} is calling</p>
            <button onClick={() => {
                dispatch({ type: "TALK" })
                dispatch({ type: "CALL" })    
            }}>Accept Call</button>
        </div>
    )
}

export default RingDisplay;