require('dotenv').config()
const express = require('express')
const cors = require('cors')
const callClaude = require('./claude')

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
    res.json({ message: 'Idea saved!', idea: newIdea })
})

app.post('/api/expand', async (req, res) => {
    const { text } = req.body
    try {
        const result = await callClaude(`Expand this pitch idea into a full breakdown with problem, solution, market, and business model: ${text}`)
        res.json({ result })
    } catch (err) {
        res.status(500).json({ error: 'Claude request failed' })
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`)
})
