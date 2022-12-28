import { useState } from "react";
import SimpleCounterApp from "./SimpleCounter/SimpleCounterApp";
import CalculatorApp from "./Calculator/CalculatorApp";

const AppSelector = () => {
  const [isSelectedApp, setIsSelectedApp] = useState(false);
  const [selectedAppName, setSelectedAppName] = useState("SimpleCounter");

  if (!isSelectedApp) {
    return (
      <div>
        <select onChange={(e) => setSelectedAppName(e.target.value)}>
          <option value="SimpleCounter">SimpleCounter</option>
          <option value="Calculator">Calculator</option>
        </select>
        <font> </font>
        <button onClick={(e) => setIsSelectedApp(true)}>Select App</button>
      </div>
    );
  } else {
    switch (selectedAppName) {
      case "SimpleCounter":
        return (<SimpleCounterApp />);
      case "Calculator":
        return (<CalculatorApp />);
      default:
        return (<div></div>);
    }
  }
}

export default AppSelector;
