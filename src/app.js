import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json()) 

const users = []

const tweets = []

app.post('/signup', (req, res) => {
    const user = req.body
    users.push(user)
    res.send("OK")
})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body
    const { avatar } = users.find(user => user.username === username)
    const newPost = {
        username: username,
        avatar: avatar,
        tweet: tweet
    }
    tweets.push(newPost)
    res.send("OK")
})

app.get('/tweets', (req, res) => {
    if (tweets.length > 10){
        const latestTweets = tweets.slice(-10)
        res.send(latestTweets)
        return
    }
    res.send(tweets)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))