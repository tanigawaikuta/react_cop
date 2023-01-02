import React from 'react'
import { useLayerManager, Layer } from '../../COPLib'
import TalkDisplay from './TalkDisplay'
import RingDisplay from './RingDisplay'
import CmpA from './CmpA'
import CmpB from './CmpB'
import CmpC from './CmpC'

function ChatScreen() {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    return (
        <div className='widgets'>
            <CmpA className='widget'/>
            <CmpB className='widget'/>
            <Layer condition={layerState.Normal}>
                <CmpC className='widget'/>
            </Layer>
            <Layer condition={layerState.Ring && !layerState.Talk}>
                <RingDisplay className='widget'/>
            </Layer>
            <Layer condition={layerState.Talk && !layerState.Ring}>
                <TalkDisplay className='widget'/>
            </Layer>
            <Layer condition={layerState.Talk && layerState.Ring}>
                <TalkDisplay className='widget'/>
            </Layer>

        </div>
    );
};

export default ChatScreen
