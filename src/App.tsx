import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./navigation/app.navigator";
import { persistor, store } from "./storage/app.store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <CssBaseline />
            <AppNavigator />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
