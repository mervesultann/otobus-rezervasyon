import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);