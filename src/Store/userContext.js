import { createContext } from "react"

const userContext = createContext({
    isAuth: {},
    setIsAuth: () => { },
    isFinger: {},
    setIsFinger: () => { },
    userPhoto: {},
    setUserPhoto: () => { },
    data: {},
    setData: () => { },
    fav: {},
    setFav: () => { },
    userKey: {},
    setUserKey: () => {},
})

export default userContext