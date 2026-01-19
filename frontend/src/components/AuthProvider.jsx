import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, useState } from "react"

const AuthProvider = () => {
    const {user, checkAuth} = useAuthStore()
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false)

    // на первом рендере компонента
    useEffect(() => {
        const init = async () => {
            // делать запрос на проверку авторизации
            await checkAuth()
            setIsChecked(true)
        }
        init()
    }, [setIsChecked])
    
    useEffect(() => {
        if (!user && isChecked) navigate("/login")
    }, [user, isChecked, navigate])

    if (!user || !isChecked) return <></>

    return <Outlet />
}

export default AuthProvider