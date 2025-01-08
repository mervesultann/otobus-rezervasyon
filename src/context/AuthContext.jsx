import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword ,updateProfile, onAuthStateChanged, signOut} from "firebase/auth";
import { auth, provider } from "../config/firebase";
import PropTypes from "prop-types"
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const register = async(email, password, name) => {
        try {
        const userCredential =   await createUserWithEmailAndPassword(auth, email, password,name);

        await updateProfile(userCredential.user, {
            displayName: name
        })

            toast.success(`Kayıt başarılı ${name}`)
            return userCredential.user;
        } catch(error) {
            toast.error(error.message)
            
        }
    };

    const login = async(email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)

          toast.success(`Hoşgeldiniz ${userCredential.user.displayName}`);
          return userCredential.user;
        } catch(error) {
            toast.error(error.message)
            
        }
    }

    const logout = async() => {
        try {
            await signOut(auth)
            toast.success("Başarıyla çıkış yapıldı")
        } catch(error) {
            toast.error(error.message)
            
        }
    }

    const loginWithGoogle = async( ) => {
        try {
            await signInWithPopup(auth, provider);
            toast.success(` Hoşgeldiniz ${auth.currentUser.displayName}`)
        } catch(error) {
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
             setUser(currentUser);
            
         })
         return () => unsubscribe()
     }, [])
  

    const value = {
        register,
        loginWithGoogle,
        login,
        logout,
        user,
        loading,

       
    }

 

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export const useAuth = () => {
const context = useContext(AuthContext)
if(!context) throw new Error("useAuth must be used within an AuthProvider")
return context
}

export default AuthProvider;