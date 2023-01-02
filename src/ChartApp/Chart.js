import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function Chart ({ getData }) {
    const opt = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'CandleStick Chart',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }
    const [convertedData, setConvertedData] = useState(null);

    useEffect(() => {
        const chartData = getData();
        if(typeof chartData === "object") {
            let rawData = Object.values(chartData);
            let arrayData = [];
            rawData.forEach((obj) => {
                arrayData.push(Object.values(obj));
            });   
            const data = [{data: arrayData}];
            setConvertedData(data);
        }
    }, [getData]);

    return (
        <div id="chart">
            {convertedData ? 
                <ReactApexChart options={opt} series={convertedData} type="candlestick" height={350} />
                : <h4>loading data...</h4>
            }
        </div>
    );
}

export default Chart;
