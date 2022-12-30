import { useState } from "react";
import SimpleCounterApp from "./SimpleCounter/SimpleCounterApp";
import CalculatorApp from "./Calculator/CalculatorApp";
import ChatApp from "./ChatApp/ChatApp";
import ChartApp from "./ChartApp/ChartApp";

// const AppSelector = () => {
//   const [isSelectedApp, setIsSelectedApp] = useState(false);
//   const [selectedAppName, setSelectedAppName] = useState("SimpleCounter");

//   if (!isSelectedApp) {
//     return (
//       <div>
//         <select onChange={(e) => setSelectedAppName(e.target.value)}>
//           <option value="SimpleCounter">SimpleCounter</option>
//           <option value="Calculator">Calculator</option>
//         </select>
//         <font> </font>
//         <button onClick={(e) => setIsSelectedApp(true)}>Select App</button>
//       </div>
//     );
//   } else {
//     switch (selectedAppName) {
//       case "SimpleCounter":
//         return (<SimpleCounterApp />);
//       case "Calculator":
//         return (<CalculatorApp />);
//       default:
//         return (<div></div>);
//     }
//   }
// }
const APPS = ['SimpleCounter', 'Calculator', 'ChatApp', 'ChartApp'];

const AppSelector = () => {
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
            <option>Select Option ...</option>

            {APPS.map((app) => (
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
          default:
            return (<div></div>);
        }})()}
      </div>
    </div>
  )
}

export default AppSelector;
