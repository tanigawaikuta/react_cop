import { useState, useEffect } from "react";
import { useLayerPrams } from "../COPLib";

const ButtonClickedCounter = () => {
    const [text, setText] = useState("");
    const [getButtonLabel, setButtonLabel] = useLayerPrams("", ["LayerA", "LayerB"]);
    const [getCount, setCount] = useLayerPrams(0, ["LayerA", "LayerB"]);

    useEffect(() => {
        setButtonLabel("A", "LayerA");
        setButtonLabel("B", "LayerB");
    }, []);

    const onClick = () => {
        setCount((ct) => ct + 1);
        setText((pre) => pre + getButtonLabel());
    };

    // JSX
    return (
        <div>
            <p>CountA: {getCount("LayerA")}</p>
            <p>CountB: {getCount("LayerB")}</p>
            <button onClick={onClick}>{getButtonLabel()}</button>
            <b> {text}</b>
        </div>
    );
};

export default ButtonClickedCounter;
