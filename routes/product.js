
const Product = require("../models/Product");
const {
    verifyToken ,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}= require("./verifyToken")

const router = require("express").Router();

//CREATE PRODUCTS

router.post("/", verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body)
   
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(newProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

// //UPDATED_PRODUCTS

router.put("/:id", verifyTokenAndAdmin,async (req, res) => {
    try{
        const updatedProducts =  await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            {
                new: true
            }, 
            );
            res.status(200).json(updatedUser)
    }catch(err) {
        res.status(500).json(err)
    }

});


// //DELETE USER
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=> {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted...."})
    }catch(err) {
        res.status(500).json(err)
    }
})

// //GET PRODUCTS

router.get("/find/:id",  async(req, res)=> {
    try{
        const product=  await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err) {
        res.status(500).json(err)
    }
})

// //GET ALL PRODUCTS
router.get("/",  async(req, res)=> {
    const Newquery = req.query.new;
    const NewCategory = req.query.category;
    try{
    
        let products; 


        if(Newquery){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(NewCategory ){
            products = await Product.find({categories:  {
                $in: [NewCategory],
            },
        });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json(err)
    }
});



module.exports = router