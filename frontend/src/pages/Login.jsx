import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(undefined)

        // Получаем значения из формы
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")

        const user = {
            email: email.trim(),
            password: password
        }

        try {
            const res = await fetch("https://ominous-space-parakeet-pjpvwp95wwgw276rr-3000.app.github.dev/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || data.message || "Ошибка авторизации")
            }

            console.log("Успешный вход:", data)
            navigate("/")

        } catch (error) {
            console.error("Ошибка входа:", error)
            setError(error.message)
        }
    }

    const showSignup = () => {
        navigate("/signup")
    }

    return (
        <div id="auth-screen" className="screen active">
            <div className="auth-container">
                <h1 className="casino-title">Вход</h1>
                <div className="auth-tabs">
                    <button 
                        className="tab-btn active" 
                        type="button"
                    >
                        Вход
                    </button>
                    <button 
                        className="tab-btn" 
                        onClick={showSignup}
                        type="button"
                    >
                        Регистрация
                    </button>
                </div>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <form 
                    id="login-form" 
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="Введите email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login