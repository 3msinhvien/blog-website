const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const blog = require('./data/blog')
const app = express()
const port = 8080

// Enable CORS for all routes
app.use(cors()) 
app.use(morgan('combined'))

//api 1: get blog list
app.get('/', (req, res) => {
  res.json(blog)
})

//api 2: get blog detail by slug

app.get('/post/:slug', (req, res) =>{
    const blogPost = blog.find( b => {
        return b.slug === req.params.slug
    })
    if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' }
        )
    }
    return res.json(blogPost)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
