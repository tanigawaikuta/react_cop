import React from "react";
import InputField from "./InputField";
import Chart from "./Chart";
import { useLayerPrams } from "../COPLib";
import LayerSwitch from "./LayerSwitch";

const App = () => {
    const [getData, setData] = useLayerPrams([], ["APPLE", "TESLA"]);

    return (
        <div>
            <p>Download csv files in public folder to run this example</p>
            <InputField setData={setData} />
            <Chart getData={getData} />
            <LayerSwitch />
        </div>
    );
};

export default App;
