const { Category } = require('../model/modelCateg');
const {Product} = require('../model/modelPro');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/`, async (req, res) => {
    //.select('name image price -_id')
    let filter = {};
    if (req.query.categories) {
        filter={category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category');
    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
})
router.post(`/`, async (req, res) => {
    //validation data
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category');

    let product = new Product({
        name: req.body.name,
        descripion: req.body.descripion,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviers: req.body.numReviers,
        isFeatured: req.body.isFeatured,
    })
    product = await product.save();
    if (!product)
        return res.status(500).send('The product cannot be created');
    res.send(product);
})

router.get(`/:id`, async(req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
})

//update data
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid product id, , check and try again!');
    };
    //validation data
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category');

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        descripion: req.body.descripion,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviers: req.body.numReviers,
        isFeatured: req.body.isFeatured,
    }, {new: true})
    if (!product)
        return res.status(400).send('The product can not be updated')
    res.send(product)
})
//Delete
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({success: true, message: 'The product is deleted successfuly'})
        } else {
            return res.status(404).json({success:false, message: 'Product not found'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
//Checking how many product you have
router.get(`/get/count`, async (req, res) => {
    try {
        const prodCount = { };
        const prodResult = await Product.countDocuments(prodCount)
        res.json({prodResult})
    } catch (err) {
        res.status(500).json({error:err.message})
    } 
})
//Checking how many product you have
router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
        res.status(500).json({success: false})
    }
    res.send(products)
})
module.exports = router;