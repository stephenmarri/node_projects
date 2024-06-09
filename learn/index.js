const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express()
app.use(express.json())


app.get('/', function (req, res) {
    res.send('Hello World from API 3000')
})

app.get('/api/products', async (req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/products/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



app.post('/api/products',async (req, res)=>{
    try {

        const prod = await Product.create(req.body)
        res.status(200).json(prod)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect("mongodb+srv://greenandthere:2htVtlgr7vbDuDbd@backenddb.jpekjaq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log('Connected to DB')
    app.listen(8080, ()=>{
        console.log("Server listening on port 3000")
    })
})
.catch(()=>{
    console.log('Connection failed')
})





