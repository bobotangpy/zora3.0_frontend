import { reduxStore } from "../redux/_index";
import { Provider } from "react-redux";
import { AppProvider } from "../services/appProvider";
import "../styles/globals.scss";
import WebHead from "../components/webHead";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <AppProvider>
        <WebHead />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </AppProvider>
    </Provider>
  );
}
export default MyApp;
