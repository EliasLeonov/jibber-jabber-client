import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavigator from "./app.navigator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavigator />
      </BrowserRouter>
    </div>
  );
}

export default App;
