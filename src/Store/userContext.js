import { createContext } from "react"

const userContext = createContext({
    isAuth: {},
    setIsAuth: () => { },
    isFinger: {},
    setIsFinger: () => { },
    userPhoto: {},
    setUserPhoto: () => { },
    Data: {},
    setData: () => { },
    fav: {},
    setFav: () => { },
    userKey: {},
    setUserKey: () => { },
    isAdmin: {},
    setIsAdmin: () => { },
})

export default userContext