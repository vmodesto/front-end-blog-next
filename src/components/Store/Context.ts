import { createContext } from "react";

const StoreContext = createContext({
    articleContent: "",
    setArticleContent: (content: any) => {},
    articleId: "",
    setArticleId: (id: any) => {},
    userData: null,
    setUserData: (user: any) => {}
})

export default StoreContext;