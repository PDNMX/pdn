import React from 'react';
export const UserContext = React.createContext({
        user: {loggedIn: false, name: 'Guest'},
        setUser: () => {}
    });