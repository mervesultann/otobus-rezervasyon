import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUser } from "../redux/slices/authSlice";
import { fetchUserRole } from "../redux/slices/roleSlice";
import { RouterProvider } from "react-router-dom";
import router from "../routes/routes";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser.providerData[0]));
        dispatch(fetchUserRole(currentUser.uid));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default AppContent;