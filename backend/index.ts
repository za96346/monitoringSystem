import express from 'express'

const app = express()

const port = 3000
app.get('/', (req, res) => {
    res.send("the server is working")
})

app.listen(port, (req, res) => {
    console.log("server is running")
})