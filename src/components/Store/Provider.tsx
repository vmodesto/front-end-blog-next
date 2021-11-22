import React, { ReactNode } from 'react';
import Context from './Context';
import useStorage  from '../../utils/useStorage.js';

interface StoreProviderProps {
    children: ReactNode
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    const [userData, setUserData] = useStorage('userData');
    const [content, setContent] = useStorage('content');
    const [articleId, setArticleId] = useStorage('');

    return (
        <Context.Provider
            value={{userData, setUserData, content, setContent, articleId, setArticleId}}
        >
            {children}
        </Context.Provider>
    )

}

export default StoreProvider;