const express = require('express')
const app = express()
const db = require('./firebase.js')


app.use(express.static("public")); 
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index',{test: 'sdfsdf'})
})

app.get('/guestbook', (req, res) => {
    res.render('guestbook',{test: 'sdfsdf'})
})

//handles comment submition
app.get('/comment', (req, res) => {
    res.render('index',{test: 'sdfsdf'})
    console.log(req.query.name)
})

async function getComments() {
    const snapshot = await db.collection('guestbook').get()
    return snapshot.docs.map(doc => doc.data())
}

app.get('/comments', async (req, res) => {
    let people = await getComments()
    console.log(people)
    res.render('comments',{people})
})


app.listen(5000, () => {
    console.log('Server running on port 5000')
})
