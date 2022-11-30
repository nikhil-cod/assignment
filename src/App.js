import logo from "./logo.svg";
import "./App.css";
import Template from "./Components/Template";
import Fields from "./Components/Fields";
import Preview from "./Components/Preview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
        <main className="container-main">
          <Router>
            <Routes>
              <Route exact  path={"/"} element={<Template/>} />
              <Route path={"/create"} element={<Fields/>} />
            </Routes>
          </Router>
        </main>
      );
};

export default App;
