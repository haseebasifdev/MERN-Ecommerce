
const slugify=require('slugify')
const category = require('../model/category')
const Category = require('../model/category')



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



exports.addCategory=(req,res)=>{
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    if (req.file) {
        categoryObj.categoryImage=`${process.env.API}/public/${req.file.filename}`
    }
    if(req.body.parentId)
    {
        categoryObj.parentId=req.body.parentId
    }
    const cat=new Category(categoryObj)


    cat.save((error,category)=>{
        if(error)
        {
            return res.status(400).json({error})
        }
        if(category)
        {
            return res.status(201).json({category})
        }
    })


}

exports.getCategories=(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error)
        {
            return res.status(400).json({error})
        }
        if(categories)
        {
            const categoryList=createCategoryList(categories)
            return res.status(200).json({categoryList})
        }
    })
}


exports.updateCategory= async (req,res)=>{
    console.log('requested',req.body);
    const{_id,name,parentId,type}=req.body;
    const updatedCategories=[];
    if(name instanceof Array){
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                type:type[i]
            };
            if(parentId !=''){
                category.parentId=parentId[i]
            }
            const id=_id[i]
            const updatedCategory= await Category.findByIdAndUpdate({_id:_id[i]},category,{new:true})
            updatedCategories.push(updatedCategory);
           
        }
        return res.status(200).json({updatedCategories}) 
    }else{
        const category={
            name,
            type
        };
        if(parentId !=''){
            category.parentId=parentId
        }
        // const id=_id[i]
        const updatedCategory= await Category.findByIdAndUpdate({_id},category,{new:true})
        // updatedCategories.push(updatedCategory);
        return res.status(200).json({updatedCategory})
    }
    res.status(200).json({body:req.body})
}

exports.deleteCategory= async (req,res)=>{
    console.log('Came in to dlete');
    // console.log(req);
    const data=req.body;
    console.log("_ID",req.body);   
    const updatedCategories=[];
    if(data.length>0){
        
        console.log("Instance",req.body.length);
        for(let i=0;i<data.length;i++){
            const {value}=data[i];
            const updatedCategory= await Category.findByIdAndDelete({_id:value},category)    
        }
        return res.status(200).json({updatedCategories}) 
    }
    // else{
    //     console.log("NOt Instance",req.body.length);
    //     const {value}=data[0]

    //     const updatedCategory= await Category.findByIdAndUpdate({_id},category)
    //     return res.status(200).json({updatedCategory})
    // }
    res.status(200).json({body:req.body})
}




