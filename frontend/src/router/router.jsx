import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Logout from "../pages/Logout"


export const router = createBrowserRouter([
    {
        path:"/login",
        element: <Login />
    },
    {   path:"/signup",
        element:<SignUp />
    },
    {
        path:"/logout",
        element:<Logout />
    }
])