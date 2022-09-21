import { useEffect } from "react";
import Compornent1 from "./Compornent1";
import Compornent2 from "./Compornent2";
import { useLayerManager } from "./COPLib";

function App() {
  const layerManager = useLayerManager();
  // initializing layer and component
  useEffect(() => {
    // Activates layer A at init
    layerManager.activateLayer("LayerA");
  }, []);

  return (
    <div>
      <Compornent1 />
      <br />
      <br />
      <Compornent2 />
    </div>
  );
}

export default App;
