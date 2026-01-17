import { useNavigate } from "react-router-dom"

const SignUp = () = > {



}
return (
    <form id="signup-form" className="auth-form">
                <div className="form-group">
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        placeholder="Придумайте имя"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Введите email"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        placeholder="Придумайте пароль"
                        required=""
                    />
                </div>
                <div className="form-group">
                    <label>Подтвердите пароль</label>
                    <input
                        type="password"
                        placeholder="Повторите пароль"
                        required=""
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Создать аккаунт
                </button>
            </form>
)

export default SignUp