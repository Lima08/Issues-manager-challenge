const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const issues = [
  {
    id: 1,
    title: 'Issue 1',
    description: 'this is an issue 1'
  },
  {
    id: 2,
    title: 'test issues',
    description: 'this is an issue 2'
  }
]

app.get('/issues', (_, res) => res.status(200).json({ issues }))

app.post('/issue', (req, res) => {
  const issue = { ...req.body }
  issues.push({ ...issues, id: issues.length + 1 })

  res.status(201).json({ issue })
})

app.put('/issue/:id', (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const updateIssue = issues.find((issue) => issue.id === Number(id))

  if (!updateIssue) {
    return res.status(404).json({ message: 'Issue not found' })
  }

  updateIssue.title = title
  updateIssue.description = description
  res.status(200).json({ updateIssue })
})

app.delete('/issue/:id', (req, res) => {
  const { id } = req.params

  const issueIndex = issues.findIndex((issue) => issue.id === Number(id))

  if (issueIndex > -1) {
    issues.splice(issueIndex, 1)
  }

  res.status(200).end()
})

module.exports = app
