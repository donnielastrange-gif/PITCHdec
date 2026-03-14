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

app.post('/api/challenge', async (req, res) => {
    const { text } = req.body
    try {
        const result = await callClaude(`You are a skeptical investor. Read this pitch and respond with 5 tough questions that challenge its weakest points: ${text}`)
        res.json({ result })
    } catch (err) {
        res.status(500).json({ error: 'Claude request failed' })
    }
})

app.post('/api/shorten', async (req, res) => {
    const { text } = req.body
    try {
        const result = await callClaude(`Condense this idea into a powerful 30 second elevator pitch. Maximum 3 sentences: ${text}`)
        res.json({ result })
    } catch (err) {
        res.status(500).json({ error: 'Claude request failed' })
    }
})

app.post('/api/score', async (req, res) => {
    const { text } = req.body
    try {
        const result = await callClaude(`Score this pitch 1-10 in five areas: Problem clarity, Solution strength, Market size, Team credibility, Business model. Give a score and one sentence for each: ${text}`)
        res.json({ result })
    } catch (err) {
        res.status(500).json({ error: 'Claude request failed' })
    }
})

// ✅ app.listen always goes last
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`)
})