'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'client' or 'worker'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user role from Firestore
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name, role, phone = '', docId = '', location = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role,
      phone,
      createdAt: new Date().toISOString()
    });
    
    // If worker, create extended profile
    if (role === 'worker') {
      await setDoc(doc(db, 'workers_profile', user.uid), {
        name,
        phone,
        docId,
        location,
        isVerified: false,
        categoryId: '',
        isOnline: false,
        rating: 5.0,
        reviewsCount: 0,
        completedJobs: 0,
        pricePerHour: 0,
        bio: ''
      });
    }
    
    return user;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    setUserRole(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, signup, login, logout }}>
      {!loading ? children : <div className="flex justify-center items-center h-full"><div className="loader">Cargando...</div></div>}
    </AuthContext.Provider>
  );
};
