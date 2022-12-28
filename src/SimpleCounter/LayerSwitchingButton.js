import { useLayerManager, Layer } from "../COPLib";

const LayerSwitchingButton = () => {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

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
            <Layer condition={layerState.LayerA && !layerState.LayerB}>
                <button disabled>LayerA</button>
                <button onClick={onClickB}>LayerB</button>
            </Layer>
            <Layer condition={layerState.LayerB && !layerState.LayerA}>
                <button onClick={onClickA}>LayerA</button>
                <button disabled>LayerB</button>
            </Layer>
        </div>
    );
};

export default LayerSwitchingButton;
