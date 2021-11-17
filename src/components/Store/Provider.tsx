import React, { ReactNode } from 'react';
import Context from './Context';
import useStorage  from '../../utils/useStorage.js';

interface StoreProviderProps {
    children: ReactNode
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    const [userData, setUserData] = useStorage('userData');

    return (
        <Context.Provider
            value={{userData, setUserData}}
        >
            {children}
        </Context.Provider>
    )

}

export default StoreProvider;