const express = require('express')
const moment = require('moment')
const db = require('./firebase.js')
const app = express()
require("dotenv").config()

const port = process.env.PORT || 5000

// firebase functions
async function getComments() {
    const snapshot = await db.collection('guestbook').orderBy("date", "desc").get()
    return snapshot.docs.map(doc => doc.data())
}

function addComment(name,email,comment) {
    db.collection("guestbook").doc().set({
        date: moment().format('MMMM Do YYYY, h:mm a'),
        name: name,
        email: email,
        comment: comment
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}
// firebase

app.use(express.static("public")); 
app.set('view engine', 'ejs')

//end points

//sign guestbook
app.get('/sign', (req, res) => {
    res.render('sign')
})

//handle sign submition
app.get('/comment', async (req, res) => {
    // res.render('index')
    addComment(req.query.name,req.query.email,req.query.comment)
    //not sure if this is the best way to do this
    let people = await getComments()
    res.render('guestbook', {people})
})

//view guestbook
app.get('/guestbook', async (req, res) => {
    let people = await getComments()
    res.render('guestbook', {people})
})

app.get('*', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
