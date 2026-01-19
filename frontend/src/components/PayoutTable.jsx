const PayoutTable = () => {
    return (
        <div className="payout-table">
                <h3>Таблица выигрышей</h3>
                <div className="payout-grid">
                    <div className="payout-item">
                        <span>💯 💯 💯</span>
                        <span className="multiplier">x100</span>
                    </div>
                    <div className="payout-item">
                        <span>🎓 🎓 🎓</span>
                        <span className="multiplier">x50</span>
                    </div>
                    <div className="payout-item">
                        <span>🔥 🔥 🔥</span>
                        <span className="multiplier">x25</span>
                    </div>
                    <div className="payout-item">
                        <span>🧠 🧠 🧠</span>
                        <span className="multiplier">x15</span>
                    </div>
                    <div className="payout-item">
                        <span>📚 📚 📚</span>
                        <span className="multiplier">x10</span>
                    </div>
                    <div className="payout-item">
                        <span>✏️ ✏️ ✏️</span>
                        <span className="multiplier">x8</span>
                    </div>
                    <div className="payout-item">
                        <span>❌ ❌ ❌</span>
                        <span className="multiplier">x0</span>
                    </div>
                </div>
            </div>
    )
}

export default PayoutTable