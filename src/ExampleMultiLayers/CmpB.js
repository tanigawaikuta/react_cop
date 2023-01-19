import React from 'react';

function CmpB({param1, param2, setParam1, setParam2}) {
    const param1Value = param1();
    const param2Value = param2();

    const addNumber = () => {
        setParam1(param1Value + 10);
    };
    const addText = () => {
        setParam2(param2Value + " Japan");
    };
    console.log("inside B")
    return (
        <div>
            <h2>CmpB</h2>
            <button onClick={addNumber}>add 10 to param1</button>
            <button onClick={addText}>add "Japan" to param2</button>
            <p>Param1 is {param1Value}</p>
            <p>Param2 is {param2Value}</p>
        </div>
    );
};

export default CmpB;
