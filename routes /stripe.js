const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

route.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        totalAmount: req.body.totalAmount,
        currency: "usd", 
    }, (stripError, stripeResponse) => {
        if(stripError) {
            res.status(400).json(stripError);
        } else {
            res.status(200).json(stripeResponse);
        }
    });
});





module.exports = router;