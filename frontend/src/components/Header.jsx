import { useAuthStore } from "../store/useAuthStore"

const Header = () => {
    const {user} = useAuthStore()

    return (
        <header className="game-header">
            <div className="user-info">
                <span className="username">{user.user.username}</span>
                <span className="balance">{user.user.balance} баллов</span>
            </div>
            <nav className="game-nav">
                {/* <button className="nav-btn" onClick={}>
                    🏆 Рейтинг
                </button>
                <button className="nav-btn" onClick={}>
                    Выход
                </button> */}
            </nav>
        </header>

    )
}

export default Header
