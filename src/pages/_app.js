import { reduxStore } from "../redux/_index";
import { Provider } from "react-redux";
import { AppProvider } from "../services/appProvider";
import "../styles/globals.scss";
import WebHead from "../components/webHead";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    // <PersistGate loading={null} persistor={persistor}>
    <Provider store={reduxStore}>
      <AppProvider>
        <WebHead />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </AppProvider>
    </Provider>
    // </PersistGate>
  );
}
export default MyApp;
