import React, { useEffect, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../component/fireBase/config'
import { onAuthStateChanged } from "firebase/auth";
import { Spin } from 'antd';
export const AuthContext = createContext()
function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user !== null) {
                const { displayName, email, uid, photoURL } = user
                // console.log(user)
                setUser({
                    displayName, email, uid, photoURL
                })
                setIsLoading(false)
                history('/')
                return;
            } else {
                console.log('no user')
                history('/login')
                setIsLoading(false)
            }
        });

        return () => {
            unsubscribe()
        }

    }, [history])

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider