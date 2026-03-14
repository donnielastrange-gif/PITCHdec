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
  res.json(newIdea)
})

app.post('/api/expand', async (req, res) => {
  const { pitch } = req.body
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
      messages: [{ role: 'user', content: `You are a startup coach. Take this pitch idea and expand it into a full pitch covering the problem it solves, the solution, the target market, and the business model. Pitch idea: ${pitch}` }]
    })
  })
  const data = await response.json()
  res.json({ result: data.content[0].text })
})

app.post('/api/challenge', async (req, res) => {
  const { pitch } = req.body
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
      messages: [{ role: 'user', content: `You are a skeptical investor. Read this pitch and respond with 5 tough questions that challenge its weakest points. Pitch: ${pitch}` }]
    })
  })
  const data = await response.json()
  res.json({ result: data.content[0].text })
})

app.post('/api/shorten', async (req, res) => {
  const { pitch } = req.body
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
      messages: [{ role: 'user', content: `You are a pitch coach. Condense this idea into a powerful 30 second elevator pitch. Maximum 3 sentences. Pitch: ${pitch}` }]
    })
  })
  const data = await response.json()
  res.json({ result: data.content[0].text })
})

app.post('/api/score', async (req, res) => {
  const { pitch } = req.body
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
      messages: [{ role: 'user', content: `You are a startup pitch judge. Score this pitch from 1 to 10 in each of these five areas: Problem clarity, Solution strength, Market size, Team credibility, Business model. Give a score and one sentence explanation for each. Pitch: ${pitch}` }]
    })
  })
  const data = await response.json()
  res.json({ result: data.content[0].text })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`)
})