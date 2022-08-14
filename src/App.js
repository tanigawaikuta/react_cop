import { useEffect } from "react";
import Compornent1 from "./Compornent1";
import Compornent2 from "./Compornent2";
import { useLayerManager } from "./COPLib";

function App() {
  const layerManager = useLayerManager();
  // コンポーネントの初期化
  useEffect(() => {
    // 初めにレイヤAをアクティブにする
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
