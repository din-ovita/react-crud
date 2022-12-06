import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./component/NavBar.js";
import Home from "./pages/Home";
import Edit from "./pages/Edit"

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/edit/:id" component={Edit} exact />
        </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
