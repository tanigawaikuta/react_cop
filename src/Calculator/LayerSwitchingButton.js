import { useLayerManager, Layer } from "../COPLib";

const LayerSwitchingButton = () => {
    const layerManager = useLayerManager();
    const layerState = layerManager.getLayerState();

    const onClickFloat = () => {
        layerManager.activateLayer("Float");
        layerManager.deactivateLayer("Integer");
    };
    const onClickInteger = () => {
        layerManager.activateLayer("Integer");
        layerManager.deactivateLayer("Float");
    };

    // JSX
    return (
        <div>
            <Layer condition={layerState.Float && !layerState.Integer}>
                <button disabled>Float</button>
                <button onClick={onClickInteger}>Integer</button>
            </Layer>
            <Layer condition={layerState.Integer && !layerState.Float}>
                <button onClick={onClickFloat}>Float</button>
                <button disabled>Integer</button>
            </Layer>
        </div>
    );
};

export default LayerSwitchingButton;
