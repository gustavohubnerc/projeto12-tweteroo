import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json()) 

const users = []

const tweets = []

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    users.push({username, avatar})
    res.status(201).send("OK")
})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body
    const checkUser = users.find((user) => user.username === username)
    if (!checkUser){
        res.status(401).send("UNAUTHORIZED")
    }
    const newPost = { username, tweet }
    tweets.push(newPost)
    res.status(201).send("OK")
})

app.get('/tweets', (req, res) => {
    const latestTweets = tweets.slice(-10)
    const showTweets = latestTweets.map((tweet) => {
        const showUser = users.find((user) => user.username === tweet.username)
        return {
            username: tweet.username,
            avatar: showUser.avatar,
            tweet: tweet.tweet
        }
    })
    res.send(showTweets)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))