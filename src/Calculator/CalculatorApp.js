import { useEffect } from "react";
import CalculationPanel from "./CalculationPanel";
import LayerSwitchingButton from "./LayerSwitchingButton";
import { useLayerManager } from "../COPLib";

const CalculatorApp = () => {
  const layerManager = useLayerManager();
  // initializing layer and component
  useEffect(() => {
    // Activates layer A at init
    layerManager.activateLayer("Float");
  }, []);

  return (
    <div>
      <CalculationPanel />
      <br />
      <br />
      <LayerSwitchingButton />
    </div>
  );
}

export default CalculatorApp;
