const express = require('express');
const router = 

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order was created'
    });
});

router.get('/:orderId', (req, res ,next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});