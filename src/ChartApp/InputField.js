import React, { useState } from "react";
import Papa from "papaparse";
import { useLayerManager } from "../COPLib";

const InputField = ({ setData }) => {
    const allowedExtensions = ["text/csv"];
    const layerManager = useLayerManager();
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setError("");
        if (e.target.files.length > 0) {
            const inputFile = e.target.files[0];
            const fileExtension = inputFile?.type;
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            setFile(inputFile);
        }
    };
    const handleParse = () => {
        if (!file) return setError("Enter a valid file");
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            await initLayerActivation(file.name, parsedData)
        };
        reader.readAsText(file);
    };

    const  initLayerActivation = async (layerName, data) => {
        console.log(layerName);
        if(layerName === 'AAPL.csv'){
            layerManager.deactivateLayer("TESLA");
            layerManager.activateLayer("APPLE");
        } else {
            layerManager.deactivateLayer("APPLE");
            layerManager.activateLayer("TESLA");    
        }
        setData(data);
    };

    return (
        <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
                </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button onClick={handleParse}>Parse</button>
            </div>
            <div style={{ marginTop: "1rem" }}>
                {error ? error : "Data loaded"}
            </div>
        </div>
    );
};

export default InputField;
