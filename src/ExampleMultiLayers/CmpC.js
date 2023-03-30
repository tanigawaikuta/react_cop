import React from 'react';

function CmpC({param1, param2, setParam1, setParam2}) {
    const param1Value = param1();
    const param2Value = param2();

    const addNumber = () => {
        setParam1(param1Value + 1000);
    };
    const addText = () => {
        setParam2(param2Value + " Tokyo");
    };
    console.log("inside C")
    return (
        <div>
            <h2>CmpC</h2>
            <button onClick={addNumber}>add 1000 to param1</button>
            <button onClick={addText}>add "Tokyo" to param2</button>
            <p>Param1 is {param1Value}</p>
            <p>Param2 is {param2Value}</p>
        </div>
    );
};

export default CmpC;
