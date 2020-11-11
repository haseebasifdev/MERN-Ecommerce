const Cart = require("../model/cart")

exports.addItemToCart=(req,res)=>{
    Cart.findOne({user:req.user._id})
    .exec((error,cart)=>{
        if(error)
        {
            res.status(400).json({error})
        }
        if(cart)
        {
            const product=req.body.cartItems.product
            const itemExist=cart.cartItems.find(c=>c.product==product)
            let condition,action;

            if (itemExist) {
                condition={"user":req.user._id,"cartItems.product":product}
                action={
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity:itemExist.quantity+req.body.cartItems.quantity
                        }
                    }
                }
            }
            else
            { 
                condition={"user":req.user._id}
                action={
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                }
               
            }
            Cart.findOneAndUpdate(condition,action)
            .exec((error,_cart)=>{
                if (error) {
                    res.status(400).json({error})
                }
                if (_cart) {
                    return res.status(200).json({cart:_cart})
                }
            })
        }
        else
        {
            const cart=new Cart({
                user:req.user._id,
                cartItems:[req.body.cartItems]
                 
            })
            cart.save((error,cart)=>{
                if(error)
                {
                    res.status(400).json({error})
                }
                if(cart)
                {
                    return res.status(200).json({cart})
                }
            })
        }
    })
    
}