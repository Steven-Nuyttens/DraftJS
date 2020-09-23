import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import "./App.css";
import Home from "./screens/home";
import Test from "./screens/test";
import Contracts from './screens/Contracts';

function App() {
  return (
    <div className="App">
      <Test />
      <Contracts />
    </div>
  );
}

export default App;
