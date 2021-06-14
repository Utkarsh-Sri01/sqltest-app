import "./App.css";
import Login from "./Login";
export const API_BASE_URL =
  "https://l87e0hu0il.execute-api.ap-southeast-2.amazonaws.com/sqlTest";
function App() {
  return (
    <div className="App">
      <header className="App-header">New SQL Test Type</header>
      <Login />
    </div>
  );
}

export default App;
