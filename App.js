import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import { Provider } from "react-redux";
import store, { persistor } from "./App/Store/index";
import { RootNav } from "./App/Navigation/RootNav";
import { PersistGate } from "redux-persist/es/integration/react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    console.log("uygulama çalıştı");
    return <AppLoading onFinish={setLoaded(true)} onError={console.warn} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNav />
      </PersistGate>
    </Provider>
  );
}
