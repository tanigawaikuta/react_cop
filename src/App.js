import { useEffect } from "react";
import Compornent1 from "./Compornent1";
import Compornent2 from "./Compornent2";
import { useLayerManager } from "./COPLib";

function App() {
  const layerManager = useLayerManager();
  // �R���|�[�l���g�̏�����
  useEffect(() => {
    // ���߂Ƀ��C��A���A�N�e�B�u�ɂ���
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
