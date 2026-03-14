const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

const ideas = []

app.get('/api/ideas', (req, res) => {
    res.json(ideas)
})

app.post('/api/ideas', (req, res) => {
    const newIdea = req.body
    ideas.push(newIdea)
    res.json({ message: 'Idea saved!', idea: newIdea})
})

const Port = 3001
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`)
})