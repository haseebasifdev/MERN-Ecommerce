const Category=require('../../model/category');
const product = require('../../model/product');
const Product=require('../../model/product')
const createCategoryList=(categories,parentId=null)=>
{
    const categoryList=[]
    let category;
    if(parentId==null)
    {
        category=categories.filter(cat=>cat.parentId==undefined)
    }
    else
    {
        category=categories.filter(cat=>cat.parentId==parentId)
    }
    for(let cat of category)
    {
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentId,
            children:createCategoryList(categories,cat._id)
        })
    }
    return categoryList
}

exports.initialData=async (req,res)=>{
    const category=await Category.find({}).exec()
    const product=await Product.find({}).
    select('_id name price quantity slug description productPictures category').
    populate({path:'category' , select:'_id name'})
    .exec()
    
    res.status(200).json(
        {
            category:createCategoryList(category),
            product
        });
    

}