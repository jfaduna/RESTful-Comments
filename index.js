const express = require('express')
const app = express();
const path = require('path')
const { v4: uuid } = require('uuid')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8trBoi',
        comment: 'Please delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(comment => comment.id === id)
    res.render('comments/show', { comment })
})
// GET /comments/:id/edit
// PATCH /comments/:id
// DELETE /comments/:id

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})