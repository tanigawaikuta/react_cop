import { useEffect } from "react";
import ButtonClickedCounter from "./ButtonClickedCounter";
import LayerSwitchingButton from "./LayerSwitchingButton";
import { useLayerManager } from "../COPLib";

const SimpleCounterApp = () => {
  const layerManager = useLayerManager();
  // initializing layer and component
  useEffect(() => {
    // Deactivate layer B at init
    layerManager.deactivateLayer("LayerB");
    // Activates layer A at init
    layerManager.activateLayer("LayerA");
  }, []);

  return (
    <div>
      <ButtonClickedCounter />
      <br />
      <br />
      <LayerSwitchingButton />
    </div>
  );
}

export default SimpleCounterApp;
