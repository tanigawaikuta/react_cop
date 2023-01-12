import React, { useEffect, useState } from 'react';
import { Layer, useLayerManager, useLayerParams } from '../COPLib';
import CmpA from './CmpA';
import CmpB from './CmpB';

function App() {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    const [pram1, setPram1] = useLayerParams(0, ["LayerA", "LayerB"]);
    const [pram2, setPram2] = useLayerParams("Hello", ["LayerA", "LayerB"]);

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
            <CmpA pram1={pram1} pram2={pram2} setPram1={setPram1} setPram2={setPram2}/>
        </Layer>
        <Layer condition={layerState.LayerB}>
            <CmpB pram1={pram1} pram2={pram2} setPram1={setPram1} setPram2={setPram2}/>
        </Layer>
    </div>
  );
};

export default App;
