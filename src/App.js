import "./App.css";
import Login from "./Login";
export const API_BASE_URL =
  "https://sqltestservice-env.eba-c4ah2ern.ap-southeast-2.elasticbeanstalk.com";
function App() {
  return (
    <div className="App">
      <header className="App-header">New SQL Test Type</header>
      <Login />
    </div>
  );
}

export default App;
