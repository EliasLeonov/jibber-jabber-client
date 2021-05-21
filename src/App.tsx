import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppNavigator from "./app.navigator";
import store from "./storage/app.store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppNavigator />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
