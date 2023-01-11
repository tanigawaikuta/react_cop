import React, { useEffect } from 'react'
import { useLayerManager } from '../../COPLib'
import Navbar from './Navbar';
import ChatScreen from './ChatScreen';

function Chat({ state }) {
    const layerManager = useLayerManager();

    useEffect(() => {
        layerManager.activateLayer("Normal");
    }, []);

    useEffect(() => {
        state.isRinging ? layerManager.activateLayer("Ring") : layerManager.deactivateLayer("Ring");
        state.isTalking ? layerManager.activateLayer("Talk") : layerManager.deactivateLayer("Talk");
        !state.isRinging && !state.isTalking ? layerManager.activateLayer("Normal") : layerManager.deactivateLayer("Normal");
    }, [state.isRinging, state.isTalking]);

    return (
        <div>
            <div>ChatApp</div>
            <section className='full-display'>
                <Navbar state={state}/>
                <ChatScreen />
            </section>
        </div>
    );
};

export default Chat;
