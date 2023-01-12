import React from 'react';

function CmpB({pram1, pram2, setPram1, setPram2}) {
    const pram1Value = pram1();
    const pram2Value = pram2();

    const addNumber = () => {
        setPram1(pram1Value + 10);
    };
    const addText = () => {
        setPram2(pram2Value + " Japan");
    };
    return (
        <div>
            <button onClick={addNumber}>add 10 to pram</button>
            <button onClick={addText}>add "Japan" to pram2</button>
            <p>Pram1 is : {pram1Value}</p>
            <p>Pram2 is {pram2Value}</p>
        </div>
    );
};

export default CmpB;
