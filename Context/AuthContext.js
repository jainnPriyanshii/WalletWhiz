import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Save user to Firestore
  const saveUserToFirestore = async (user, username = '') => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: username || user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      photoURL: user.photoURL || '',
      createdAt: new Date(),
    }, { merge: true });
  };

  // Track auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await AsyncStorage.setItem('userId', firebaseUser.uid);
        await saveUserToFirestore(firebaseUser);
      } else {
        setUser(null);
        await AsyncStorage.removeItem('userId');
      }
    });

    return () => unsubscribe();
  }, []);

  // Register new user
  const register = async (email, password, username) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = res.user;

    // Update Firebase Auth profile
    await updateProfile(currentUser, {
      displayName: username,
    });

    
    await saveUserToFirestore(currentUser, username);

    return res;
  };


  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

 
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
