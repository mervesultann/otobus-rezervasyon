import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Analytics } from "@vercel/analytics/react"


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
      <Analytics />
    </AuthProvider>
  </Provider>
);