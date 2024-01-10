import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, 
    signInWithPopup, GithubAuthProvider, 
    createUserWithEmailAndPassword, signOut, 
    onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, currentUser: action.payload }
        case 'LOGOUT':
            return { ...state, currentUser: null }
        default:
            return state;
    }
}

export function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, { currentUser: null });

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const loginWithGithub = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        })
        return unsubscribe;
    }, [])
    const value = {
        currentUser: state.currentUser,
        login,
        signup,
        logout,
        loginWithGithub
    }

    return (
        <AuthContext.Provider value={value} {...props} />

    )
}
