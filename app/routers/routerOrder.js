const {Order} = require('../model/modelOrder');
const express = require('express');
const { OrderItem } = require('../model/order-item');
const router = express.Router();


router.get(`/`, async(req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    if (!orderList) {
        res.status(500).json({ success: false });
    }
    res.send(orderList);
})
router.get(`/:id`, async(req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'}
        });
    if (!order) {
        res.status(500).json({ success: false });
    }
    res.send(order);
})
router.post('/', async (req, res) => {
    let orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id
    }))
    const orderItemsIdsResolved = await orderItemsIds;

    //Calculate proce
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemsId) => {
        const orderItem = await OrderItem.findById(orderItemsId).populate('product', 'price');
        let totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))
    const totalPrice = totalPrices.reduce((a, b) => a +b, 0);
    console.log(totalPrices);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
   order = await order.save();
    if (!order)
        return res.status(404).send('The order cannot be created')
    res.send(order);
})
 
//update data
router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    },
        { new: true }
    )
    if (!order)
        return res.status(400).send('The order can not be created')
    res.send(order);
})
//Delete
router.delete('/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success: true, message: 'The Order is deleted successfuly'})
        } else {
            return res.status(404).json({success:false, message: 'Order not found'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})
module.exports = router;