import React, { useEffect, useState } from 'react';
import { Layer, useLayerManager, useLayerParams } from '../COPLib';
import CmpA from './CmpA';
import CmpB from './CmpB';

function App() {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    const [param1, setParam1] = useLayerParams(0, ["LayerA", "LayerB"]);
    const [param2, setParam2] = useLayerParams("Hello", ["LayerA", "LayerB"]);

    const [isLayerA, setIsLayerA] = useState(true);
    useEffect(() => {
        if(isLayerA) {
            layerManager.activateLayer("LayerA");
            layerManager.deactivateLayer("LayerB");
        } else {
            layerManager.activateLayer("LayerB");
            layerManager.deactivateLayer("LayerA");
        }
    }, [isLayerA]);

  return (
    <div>
        <button onClick={() => setIsLayerA(!isLayerA)}>{isLayerA?"LayerA":"LayerB"}</button>

        <Layer condition={layerState.LayerA}>
            <CmpA param1={param1} param2={param2} setParam1={setParam1} setParam2={setParam2}/>
        </Layer>
        <Layer condition={layerState.LayerB}>
            <CmpB param1={param1} param2={param2} setParam1={setParam1} setParam2={setParam2}/>
        </Layer>
    </div>
  );
};

export default App;
