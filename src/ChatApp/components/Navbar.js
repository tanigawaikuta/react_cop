import React from 'react'
import { Layer, useLayerManager } from '../../COPLib'
import TimeShow from './TimeShow';
import Notification from './Notification';

function Navbar({ state }) {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    return (
        <div className='navbar-layout'>
            <Layer condition={layerState.Normal}>
                <TimeShow />
            </Layer>
            <Layer condition={layerState.Ring && !layerState.Talk}>
                <Notification state={state}/>
            </Layer>
            <Layer condition={layerState.Talk && !layerState.Ring}>
                <TimeShow />
            </Layer>
            <Layer condition={layerState.Talk && layerState.Ring}>
                <Notification state={state}/>
            </Layer>
        </div>
    );
};

export default Navbar
