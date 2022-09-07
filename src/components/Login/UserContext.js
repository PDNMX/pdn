import React from 'react';
export const UserContext = React.createContext({
    user: {
        loggedIn: false,
        nombres: 'No autenticado'
    },
    setUser: () => {}
});