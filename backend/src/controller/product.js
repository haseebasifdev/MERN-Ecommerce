const Product = require('../model/product')

const slugify=require('slugify')

exports.createproduct=(req,res)=>{
    const {name,price,description,offer,category,quantity}=req.body
    let productPictures=[]
    if(req.files.length>0)
    {
        productPictures=req.files.map(file=>
            {   
                return {img:file.filename}
            } )
    }
    const product=new Product({
        name,
        slug:slugify(name),
        price,
        description,
        productPictures,
        offer,
        category,
        quantity,
        createdBy:req.user._id
        
    })
    
    product.save((error,product)=>{
        if(error) return res.status(400).json({error})
        if(product) return res.status(200).json({product})
    })

    // res.status(200).json({file:req.files, body:req.body})
}