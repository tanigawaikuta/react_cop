import { useLayerManager, Layer } from "./COPLib";

const Compornent2 = () => {
    const layerManager = useLayerManager();

    const onClickA = () => {
        layerManager.activateLayer("LayerA");
        layerManager.deactivateLayer("LayerB");
    };
    const onClickB = () => {
        layerManager.activateLayer("LayerB");
        layerManager.deactivateLayer("LayerA");
    };

    // JSX
    return (
        <div>
            <Layer name="LayerA">
                <button disabled>LayerA</button>
                <button onClick={onClickB}>LayerB</button>
            </Layer>
            <Layer name="LayerB">
                <button onClick={onClickA}>LayerA</button>
                <button disabled>LayerB</button>
            </Layer>
        </div>
    );
};

export default Compornent2;
