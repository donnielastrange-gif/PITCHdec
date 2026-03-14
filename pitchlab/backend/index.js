require('dotenv').config()
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
  res.json({ message: 'Idea saved!', idea: newIdea })
})

app.post('/api/expand', async (req, res) => {
  const { pitch } = req.body
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: `You are a startup coach. Expand this pitch covering problem, solution, market, and business model: ${pitch}` }]
      })
    })
    const data = await response.json()
    res.json({ result: data.content[0].text })
  } catch (err) {
    res.status(500).json({ error: 'Claude request failed' })
  }
})

app.post('/api/challenge', async (req, res) => {
  const { pitch } = req.body
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: `You are a skeptical investor. Give 5 tough questions challenging this pitch: ${pitch}` }]
      })
    })
    const data = await response.json()
    res.json({ result: data.content[0].text })
  } catch (err) {
    res.status(500).json({ error: 'Claude request failed' })
  }
})

app.post('/api/shorten', async (req, res) => {
  const { pitch } = req.body
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: `Condense this into a 30 second elevator pitch, maximum 3 sentences: ${pitch}` }]
      })
    })
    const data = await response.json()
    res.json({ result: data.content[0].text })
  } catch (err) {
    res.status(500).json({ error: 'Claude request failed' })
  }
})

app.post('/api/score', async (req, res) => {
  const { pitch } = req.body
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: `Score this pitch 1-10 on: Problem clarity, Solution strength, Market size, Team credibility, Business model. Give score and one sentence for each: ${pitch}` }]
      })
    })
    const data = await response.json()
    res.json({ result: data.content[0].text })
  } catch (err) {
    res.status(500).json({ error: 'Claude request failed' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`)
})