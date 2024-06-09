require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


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

app.put('/api/product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const prodcut = await Product.findByIdAndUpdate(id, req.body)

        if(!prodcut){
            return res.status(404).json({message: "Prodcut not found"})
        }

        const updatedProdct = await Product.findById(id)
        res.status(200).json(updatedProdct)

    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})

app.delete('/api/product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const prodcut = await Product.findByIdAndDelete(id, req.body)

        if(!prodcut){
            return res.status(404).json({message: "Prodcut not found"})
        }
        res.status(200).json({message: "Product Deleted succsesfully"})

    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to DB ')
    app.listen(process.env.PORT, ()=>{
        console.log("Server listening on port 3000")
    })
})
.catch(()=>{
    console.log('Connection failed')
})





