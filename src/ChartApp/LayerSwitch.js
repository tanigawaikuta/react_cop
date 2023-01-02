import React, { useEffect, useState } from 'react'
import { useEffectWithLayer, useLayerManager } from '../COPLib'

function LayerSwitch() {
    const layerManager = useLayerManager();
    const [islayerAPPLE, setIsLayerAPPLE] = useState(true);

    useEffect(() => {
        const activeLayerName = islayerAPPLE ? "APPLE" : "TESLA";
        const deactiveLayerName = islayerAPPLE ? "TESLA" : "APPLE";
        layerManager.activateLayer(activeLayerName);
        layerManager.deactivateLayer(deactiveLayerName);
    }, [islayerAPPLE]);

  return (
    <div>
        <p>Change layer to </p>
        <button onClick={() => setIsLayerAPPLE(!islayerAPPLE)}>{islayerAPPLE?"TESLA":"APPLE"}</button>
    </div>
  );
};

export default LayerSwitch