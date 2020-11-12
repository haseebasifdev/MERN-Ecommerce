const express=require('express')
const env=require('dotenv')
const path=require('path')
env.config()
const app=express()

// mongodb connection
// mongodb+srv://root:<password>@cluster0.fucme.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose');
app.use(express.json())
const userRoutes=require('./route/user')
const adminRoutes=require('./route/admin/user')
const categoryRoutes=require('./route/category')
const productRoutes=require('./route/product')
const InitialData=require('./route/admin/initialData')
const cartRoutes=require('./route/cart')
const cors=require('cors')
const urldb='mongodb://root:rootpassword@cluster0-shard-00-00.fucme.mongodb.net:27017,cluster0-shard-00-01.fucme.mongodb.net:27017,cluster0-shard-00-02.fucme.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-jg1v2m-shard-0&authSource=admin&retryWrites=true&w=majority'
// mongoose.connect(`mongodb+srv://root:rootpassword@cluster0.fucme.mongodb.net/mern?retryWrites=true&w=majority`, 
mongoose.connect(urldb, 
{useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{
    console.log('Connected to database')
}).catch((error)=>{
    console.log(error)
});
app.use(cors())
app.use('/api',userRoutes)
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',cartRoutes)
app.use('/api',productRoutes)
app.use('/api',productRoutes)
app.use('/api',InitialData)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
