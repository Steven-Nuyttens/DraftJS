import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import "./App.css";
import Home from "./screens/home";
import Test from "./screens/test";
import Contracts from './screens/Contracts';
import Titles from './screens/title'


function App() {
  return (
    <div className="App">
      <Test />
      <Titles />
    </div>
  );
}

export default App;
