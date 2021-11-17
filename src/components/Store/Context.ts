import { createContext } from "react";

const StoreContext = createContext({
    userData: null,
    setUserData: (user: any) => {}
})

export default StoreContext;