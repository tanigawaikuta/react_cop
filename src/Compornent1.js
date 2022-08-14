import { useState, useRef } from "react";
import { useEffectWithLayer } from "./COPLib";

const Compornent1 = () => {
    const [text, setText] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [count, setCount] = useState(0);
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    // �{�^���N���b�N���̃x�[�X�����i�S���C���񊈐����̏����j
    const onClickBase = () => { setCount(ct => ct + 1); };
    const onClick = useRef(() => { onClickBase(); });

    // ���C��A�������̏���
    useEffectWithLayer(() => {
        // ��Ԃ̏�������
        setButtonLabel("A");
        // onClick�̏�������
        onClick.current = () => {
            setText(preText => preText + "A");
            // �x�[�X�����̌Ăяo��
            onClickBase();
        };
    }, "LayerA", []);

    // ���C��B�������̏���
    useEffectWithLayer(() => {
        // ��Ԃ̏�������
        setButtonLabel("B");
        // onClick�̏�������
        onClick.current = () => {
            setText(preText => preText + "B");
            // �x�[�X�����̌Ăяo��
            onClickBase();
        };
    }, "LayerB", []);

    // ���C��A����������count���ω������ۂ̏���
    useEffectWithLayer(() => {
        const result = count - countB;
        setCountA(result);
    }, "LayerA", [count]);

    // ���C��B����������count���ω������ۂ̏���
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
