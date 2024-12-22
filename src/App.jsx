import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppContent from "./components/AppContent";

function App() {

 


  return (
    <Provider store={store}>
      <AppContent />
      <Toaster position="top-right" />
    </Provider>
  );
}

export default App;
