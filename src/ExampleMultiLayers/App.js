import React, { useEffect, useState } from 'react';
import { Layer, useLayerManager, useLayerParams } from '../COPLib';
import CmpA from './CmpA';
import CmpB from './CmpB';
import CmpC from './CmpC';

function App() {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    const [param1, setParam1] = useLayerParams(0, ["LayerA", "LayerB", "LayerC"]);
    const [param2, setParam2] = useLayerParams("Hello", ["LayerA", "LayerB", "LayerC"]);

    const [isLayerA, setIsLayerA] = useState(true);
    const [isLayerB, setIsLayerB] = useState(true);
    const [isLayerC, setIsLayerC] = useState(true);
    useEffect(() => {
        if(isLayerA) {
            layerManager.activateLayer("LayerA");
        } else {
            layerManager.deactivateLayer("LayerA");
        }
    }, [isLayerA]);

    useEffect(() => {
        if(isLayerB) {
            layerManager.activateLayer("LayerB");
        } else {
            layerManager.deactivateLayer("LayerB");
        }
    }, [isLayerB]);

    useEffect(() => {
        if(isLayerC) {
            layerManager.activateLayer("LayerC");
        } else {
            layerManager.deactivateLayer("LayerC");
        }
    }, [isLayerC]);

  return (
    <div>
        <button onClick={() => setIsLayerA(!isLayerA)}>{isLayerA?"Activate LayerA":"Deactivate LayerA"}</button>
        <button onClick={() => setIsLayerB(!isLayerB)}>{isLayerB?"Activate LayerB":"Deactivate LayerB"}</button>
        <button onClick={() => setIsLayerC(!isLayerC)}>{isLayerC?"Activate LayerC":"Deactivate LayerC"}</button>

        <Layer condition={layerState.LayerA}>
            <CmpA param1={param1} param2={param2} setParam1={setParam1} setParam2={setParam2}/>
        </Layer>
        <Layer condition={layerState.LayerB}>
            <CmpB param1={param1} param2={param2} setParam1={setParam1} setParam2={setParam2}/>
        </Layer>
        <Layer condition={layerState.LayerC}>
            <CmpC param1={param1} param2={param2} setParam1={setParam1} setParam2={setParam2}/>
        </Layer>
    </div>
  );
};

export default App;
