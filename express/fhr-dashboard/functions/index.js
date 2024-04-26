/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });n

const functions = require('firebase-functions')
const admin = require('firebase-admin')

var serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require('express')
const app = express();
const db = admin.firestore()

const cors = require('cors')
app.use( cors( { origin:true } ) )




//Routes
app.get('/Hello', (req, res) => {
    return res.status(200).send("Hello World!!")
})

//Create
app.post('/api/create', (req, res) => {
    (async()=>{
        try{
            await db.collection('conference').doc('/' + req.body.id + '/')
            .create({
                name: req.body.name,
                message: req.body.message,
                time: req.body.time
            })
            return res.status(200).send()
        }
        catch(error){
            console.log(error);
            return res.status(500).send()
        }
    })()
})


//Read
app.get('/api/read/:id', (req, res) => {
    (async()=>{
        try{
            const document = db.collection('conference').doc(req.params.id);
            let product = await document.get();
            let response = product.data()

            return res.send(response).status(200);
        }
        catch(error){
            console.log(error);
            return res.status(500).send()
        }
    })()
})

exports.app = functions.https.onRequest(app)