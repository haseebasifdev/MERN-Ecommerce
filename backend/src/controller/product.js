const Product = require('../model/product')

const slugify = require('slugify')
const Category = require('../model/category')
const product = require('../model/product')
exports.createproduct = (req, res) => {
    const { name, price, description, offer, category, quantity } = req.body
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        offer,
        category,
        quantity,
        createdBy: req.user._id

    })

    product.save((error, product) => {
        if (error) return res.status(400).json({ error })
        if (product) return res.status(200).json({ product })
    })

    // res.status(200).json({file:req.files, body:req.body})
}


exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) {
                            return res.status(400).json({ error })
                        }
                        if (products.length > 0) {

                            res.status(200).json({
                                products,
                                ProductByPrice: {
                                    under5k: products.filter(product => product.price <= 5000),
                                    under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                    under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                    under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                    under25k: products.filter(product => product.price > 20000 && product.price <= 25000),
                                    under30k: products.filter(product => product.price > 25000 && product.price <= 30000),
                                }
                            })
                        }
                    })
                // res.status(200).json({category});
            }
            else {
                res.status(200).json({ category });
            }
        })
    // res.status(200).json({slug});
}
















