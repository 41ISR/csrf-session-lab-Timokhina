import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(undefined)

        if (e.target.password.value !== e.target.password2.value) {
            setError("Пароли не совпадают")
            return
        }

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            const res = await fetch("https://ominous-space-parakeet-pjpvwp95wwgw276rr-3000.app.github.dev/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message || data.error || "Ошибка регистрации")

            navigate("/")
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    const showLogin = () => {
        navigate("/login") // Assuming you have a login route
    }

    const showSignup = () => {
        // Already on signup page
    }

    return (
        <div id="auth-screen" className="screen active">
            <div className="auth-container">
                <h1 className="casino-title">Регистрация</h1> {/* Changed to "Регистрация" */}
                <div className="auth-tabs">
                    <button 
                        className="tab-btn" 
                        onClick={showLogin}
                        type="button"
                    >
                        Вход
                    </button>
                    <button 
                        className="tab-btn active" 
                        onClick={showSignup}
                        type="button"
                    >
                        Регистрация
                    </button>
                </div>
                <form id="signup-form" className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Придумайте имя"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Введите email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Придумайте пароль"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Подтвердите пароль</label>
                        <input
                            id="password2"
                            name="password2"
                            type="password"
                            placeholder="Повторите пароль"
                            required
                        />
                    </div>
                    {error && (
                        <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                            {error}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Создать аккаунт
                    </button>
                </form>
            </div>
        </div >
    )
}
export default SignUp