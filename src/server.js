const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('techofmany.com')
})

app.listen(port, () => {
  console.log(`Example app listening at on port ${port}`)
})
