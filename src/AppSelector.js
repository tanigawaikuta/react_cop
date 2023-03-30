import { useState } from "react";
import SimpleCounterApp from "./SimpleCounter/SimpleCounterApp";
import CalculatorApp from "./Calculator/CalculatorApp";
import ChatApp from "./ChatApp/ChatApp";
import ChartApp from "./ChartApp/ChartApp";
import ExampleUseLayerParams from "./ExampleUseLayerParams/App";
import ExampleMultiLayers from "./ExampleMultiLayers/App";


const AppSelector = () => {
  const Apps = ['SimpleCounter', 'Calculator', 'ChatApp', 'ChartApp', 'ExampleUseLayerParams', 'ExampleMultiLayers'];
  const [app, setApp] = useState("");

  return (
    <div>
      <form>
        <label>
          Example App: 
            <select
              id="app"
              value={app}
              onChange={(e) => {setApp(e.target.value)}}
            >
            <option>Select App ...</option>

            {Apps.map((app) => (
              <option key={app}>{app}</option>
            ))}
            </select>
        </label>
      </form>
      <div>
        {(() => {switch(app) {
          case "SimpleCounter":
            return (<SimpleCounterApp />);
          case "Calculator":
            return (<CalculatorApp />);
          case "ChatApp":
            return (<ChatApp />);
          case "ChartApp":
            return (<ChartApp />);
          case "ExampleUseLayerParams":
            return (<ExampleUseLayerParams />);
          case "ExampleMultiLayers":
            return (<ExampleMultiLayers />)
          default:
            return (<div></div>);
        }})()}
      </div>
    </div>
  )
}

export default AppSelector;
