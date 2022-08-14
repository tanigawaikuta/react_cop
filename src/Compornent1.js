import { useState, useRef } from "react";
import { useEffectWithLayer } from "./COPLib";

const Compornent1 = () => {
    const [text, setText] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [count, setCount] = useState(0);
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    // ボタンクリック時のベース処理（全レイヤ非活性時の処理）
    const onClickBase = () => { setCount(ct => ct + 1); };
    const onClick = useRef(() => { onClickBase(); });

    // レイヤA活性時の処理
    useEffectWithLayer(() => {
        // 状態の書き換え
        setButtonLabel("A");
        // onClickの書き換え
        onClick.current = () => {
            setText(preText => preText + "A");
            // ベース処理の呼び出し
            onClickBase();
        };
    }, "LayerA", []);

    // レイヤB活性時の処理
    useEffectWithLayer(() => {
        // 状態の書き換え
        setButtonLabel("B");
        // onClickの書き換え
        onClick.current = () => {
            setText(preText => preText + "B");
            // ベース処理の呼び出し
            onClickBase();
        };
    }, "LayerB", []);

    // レイヤA活性時かつcountが変化した際の処理
    useEffectWithLayer(() => {
        const result = count - countB;
        setCountA(result);
    }, "LayerA", [count]);

    // レイヤB活性時かつcountが変化した際の処理
    useEffectWithLayer(() => {
        const result = count - countA;
        setCountB(result);
    }, "LayerB", [count]);

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
