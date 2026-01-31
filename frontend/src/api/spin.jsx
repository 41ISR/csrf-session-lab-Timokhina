const Spin = () => {

    // Таблица выплат: комбинация → множитель
const PAYOUTS = {
    '💯💯💯': 100,
    '🎓🎓🎓': 50,
    '🔥🔥🔥': 25,
    '🧠🧠🧠': 15,
    '📚📚📚': 10,
    '✏️✏️✏️': 8,
    '❌❌❌': 0,
}

const SYMBOLS = ['📚', '✏️', '🧠', '🎓', '🔥', '💯', '❌']

function getCombinationMultiplier(symbols) {
    const combo = symbols.join('')
    return PAYOUTS[combo] || 0
}

// Валидация ставки
if (![10, 50, 100].includes(bet)) {
    return res.status(400).json({ error: 'Недопустимая ставка' })
}

try {
    // Получаем текущий баланс
    const user = db
        .prepare('SELECT balance FROM users WHERE id = ?')
        .get(req.session.userId)
    if (!user || user.balance < bet) {
        return res.status(400).json({ error: 'Недостаточно баллов' })
    }

    // Генерируем случайный результат
    const resultSymbols = Array.from(
        { length: 3 },
        () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    )
    const multiplier = getCombinationMultiplier(resultSymbols)
    const winAmount = multiplier * bet

    // Обновляем баланс в БД
    const newBalance = user.balance - bet + winAmount
    db.prepare('UPDATE users SET balance = ? WHERE id = ?').run(
        newBalance,
        req.session.userId,
    )

    // Отправляем результат
    res.json({
        symbols: resultSymbols,
        winAmount,
        isWin: winAmount > 0,
        newBalance,
    })
} catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Ошибка сервера' })
}
    
}

export default Spin 