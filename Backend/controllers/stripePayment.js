const stripe = require("stripe")("sk_test_51IehW4SA6qcYHM47c4XFwJqwclhemkGSWIz3zgFsTjJ4iG8rkKcfvEH4h0yLLMkinDfbKJAuYQyC4ANyHqVS2HoA00Pn0QeFnZ")
const { result } = require("lodash");
const uuid = require("uuid/v4")


exports.makePayment = (req, res) => {
    const { products, token} = req.body;

    console.log("PRODUCTS ", products)

    let amount = 0;
    products.map(p => {
        amount = amount + p.product_price;
    })

    const idempotencyKey = uuid()

    return stripe.customers.create({
        email : token.email,
        source : token.id
    })
    .then(customer => {
        stripe.charges
        .create({
            amount : amount*100,
            currency : "inr",
            customer : customer.id,
            receipt_email : token.email,
            description : "A test Account",
            shipping : {
                name : token.card.name,
                address : {
                    line1 : token.card.address_line1,
                    line2 : token.card.address_line2,    
                    city  : token.card.address_city,
                    country : token.card.address_country,
                    postal_code : token.card.address_zip
                } 
            }
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    })
}