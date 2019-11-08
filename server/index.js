require('dotenv').config()
const express = require('express')
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')


app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.get("/api/treasure/all", auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasures)
app.post("/api/treasure/user", auth.usersOnly, treasureCtrl.addUserTreasure)
app.get("/api/treasure/user", auth.usersOnly, treasureCtrl.getUserTreasure)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)


massive(CONNECTION_STRING).then((db) => {
app.set('db', db)
app.listen(SERVER_PORT,() => console.log(`Self destruct in ${SERVER_PORT}`))
})
