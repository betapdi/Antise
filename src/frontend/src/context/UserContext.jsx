import React, { Children } from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    //User Data
    const [userId, setUserId] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <UserContext.Provider value = {{
            userId, setUserId, fullName, setFullName,
            email, setEmail, role, setRole,
            phoneNumber, setPhoneNumber
        }}>
            {children}
        </UserContext.Provider>
    )
}
