const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
// const fileUpload = require('express-fileupload');
require('dotenv').config()
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const uri = `mongodb+srv://allnaim:allnaimbecm007@cluster0.guqdp.mongodb.net/phero?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // root
    // app.use('/', )
    console.log('db connection success')
    const addNewUser = client.db("phero").collection("users");
    const addToTempStore = client.db("phero").collection("tempstore");
    const appliedJob = client.db("phero").collection("appliedjob");


    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.post("/users", (req, res) => {
        console.log(req.body)
        addNewUser.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0);
            })

    })
    app.post("/applyjob", (req, res) => {
        appliedJob.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0);
            })

    })
    app.get('/user', (req, res) => {
        addNewUser.find(req.query.email)
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/user', (req, res) => {
        addNewUser.find(req.query.token)
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/user', (req, res) => {
        addNewUser.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.post("/tempstore", (req, res) => {
        console.log(req.body)
        addToTempStore.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0);
                console.log('added')
            })

    })
    app.get('/tempdata', (req, res) => {
        addToTempStore.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/tempdata', (req, res) => {
        addToTempStore.find({email: req.body.email})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.delete('/deletedata', (req, res) => {
        addBookmark.deleteOne(req.query.id, (err) => {
            if (err) {
                console.log('not deleted')
            } else {
                console.log('deleted')
            }
        })
    })
    app.get('/jobdata', (req, res) => {
        addToTempStore.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/getjobdata', (req, res) => {
        console.log()
        appliedJob.find({email: req.query.email})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.put('/updatestore', (req, res) => {
        addToTempStore.updateMany({ title: req.body.title, email: req.body.email, description: req.body.description }, { $set: { pending: 'false' } }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('changed')
                // console.log(result)
            }
        })
    })
});

app.listen(process.env.PORT || 8000)