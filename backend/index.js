const db = require('./db')
const csrf = require('csurf')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express()

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

app.set("trust proxy", 1)

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    exposedHeaders: ["set-cookie"]
}))
app.use(session({
    secret: "asdasdasdasdasdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        name: "sessionId",
        // sameSite: "strict",
        sameSite: "none", 
        secure: true, 
        domain: undefined
    }
}))

const csrfMiddleware = csrf({
    cookie: {
        httpOnly: false,
        sameSite: "none",
        secure: true,
        domain: undefined
    }
})

app.get("/auth/me", (req, res) => {
    const { balance } = db.prepare(
        "SELECT balance FROM users WHERE id = ?"
    ).get(req.session.userId) || 0
    console.log(req.session)
    if (req.session.userId) {
        return res.status(200).json({logged: true, user: {
            userId: req.session.userId,
            username: req.session.username,
            email: req.session.email,
            balance: balance
        }})
    }
        return res.status(401).json({logged: false})
    })

app.post("/auth/signup", (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10)
        const newUser = db
            .prepare(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`)
            .run(req.body.email, req.body.username, hashed);
        const createdUser = db
            .prepare(`SELECT * FROM users WHERE id = ?`)
            .get(newUser.lastInsertRowid);

        req.session.userId = createdUser.id
        req.session.email = createdUser.email
        req.session.username = createdUser.username
        req.session.balance = createdUser.balance

        res.status(201).json(createdUser)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.code)
    }
})

app.post("/auth/signin", (req, res) => {
    try {
        const { email, password } = req.body
        const user = db
            .prepare(`SELECT * FROM users WHERE email = ?`)
            .get(email)
        if (!user) 
            res
                .status(401)
                .json({ error: "Неправильные данные" })
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) 
            res
                .status(401)
                .json({ error: "Неправильные данные" })

        console.log(user);
                
        req.session.email = user.email
        req.session.userId = user.id
        req.session.username = user.username
        req.session.balance = user.balance

        res.status(200).json(user) 
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
    
})

app.post("/auth/logout", (req, res) => {
    req.session.destroy((err) => {
        err && res.status(500).json({error: "Не получилось выйти"})
        res.clearCookie("sessionId")
        res.status(200).json({message: "Выход успешен"})
    })
})

app.get("/leaderboard", (req, res) => {
    const users = db.prepare(
        "SELECT * FROM users ORDER BY balance DESC LIMIT 10"
    ).all()

    const sanitizedUsers = users.map((el) => {
        const {createdAt, password, ...newUser} = el
        return newUser
    })

    res.status(200).json(sanitizedUsers)
})

app.get("/csrf-token", csrfMiddleware, (req, res) => {
    res.json({token: req.csrfToken()})
})

app.post('/spin', csrfMiddleware, (req, res)=>{

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

})


app.listen("3000", () => {
    console.log("Порт3000")
})

