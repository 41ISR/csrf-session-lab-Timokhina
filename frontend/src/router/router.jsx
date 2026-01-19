import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Game from "../pages/Game"
import SignUp from "../pages/SignUp"
import Logout from "../pages/Logout"
import AuthProvider from "../components/AuthProvider"


export const router = createBrowserRouter([
        {
        path: "/",
        element: <AuthProvider />,
        children: [{
            index: true,
            element: <Game />
        }]
    },
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