import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };
  const ChangePassword = (newPassword) => {
    setLoading(true);
    return updatePassword(auth.currentUser, newPassword);
  };

  const sendResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const verifyAccount = () => {
    setLoading(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.info(
          "Verification email sent! Please check your inbox to verify your account."
        );
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribeUser = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios.post("https://ph-11-assignment-server.vercel.app/jwt", user, {
          withCredentials: true,
        })
      } else {
        axios.get("https://ph-11-assignment-server.vercel.app/logout", {
          withCredentials: true,
        })
      }
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  const value = {
    user,
    setUser,
    creatUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    loading,
    setLoading,
    verifyAccount,
    ChangePassword,
    sendResetEmail,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;