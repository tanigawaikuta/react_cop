import { useEffect } from "react";
import CalculationPanel from "./CalculationPanel";
import LayerSwitchingButton from "./LayerSwitchingButton";
import { useLayerManager } from "../COPLib";

const CalculatorApp = () => {
  const layerManager = useLayerManager();
  // initializing layer and component
  useEffect(() => {
    // Deactivate Layer Integer at init
    layerManager.deactivateLayer("Integer");
    // Activates layer Float at init
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
