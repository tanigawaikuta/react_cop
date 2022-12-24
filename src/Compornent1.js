import { useState, useRef } from "react";
import { useEffectWithLayer, useLayerManager } from "./COPLib";

const Compornent1 = () => {
    const [text, setText] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [count, setCount] = useState(0);
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const layerManager = useLayerManager();

    // Base process on button click（when all layers are deactivated）
    const onClickBase = () => { setCount(ct => ct + 1); };
    const onClick = useRef(() => { onClickBase(); });

    // A process when layer A is active.
    useEffectWithLayer(() => {
        // updates state
        setButtonLabel("A");
        // updates onClick
        onClick.current = () => {
            setText(preText => preText + "A");
            // calls base process
            onClickBase();
        };
    }, layerManager.getLayerState("LayerA"), []);

    // A process when layer is active
    useEffectWithLayer(() => {
        // updates state
        setButtonLabel("B");
        // updates onClick
        onClick.current = () => {
            setText(preText => preText + "B");
            // calls base process
            onClickBase();
        };
    }, layerManager.getLayerState("LayerB"), []);

    // A process when count is changed while layer A is active
    useEffectWithLayer(() => {
        const result = count - countB;
        setCountA(result);
    }, layerManager.getLayerState("LayerA"), [count]);

    // A process when count is changed while layer B is active
    useEffectWithLayer(() => {
        const result = count - countA;
        setCountB(result);
    }, layerManager.getLayerState("LayerB"), [count]);

    // JSX
    return (
        <div>
            <p>CountA: {countA}</p>
            <p>CountB: {countB}</p>
            <button onClick={onClick.current}>{buttonLabel}</button>
            <b> {text}</b>
        </div>
    );
};

export default Compornent1;
