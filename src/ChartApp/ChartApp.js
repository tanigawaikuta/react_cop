import React, { useState } from "react";
import InputField from "./InputField";
import Chart from "./Chart";
import { useLayerManager, useLayerPrams } from "../COPLib";
import LayerSwitch from "./LayerSwitch";

const allowedExtensions = ["csv"];

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
