const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "f69wfznsc3qf8bt4",
  publicKey: "qzpvpfbmhhbw9nbk",
  privateKey: "4034b2cb4fb6dc214d3a238bea34374f"
});

exports.getToken = ( req, res) => {
    gateway.clientToken.generate({ }, (err, response) => {
        // pass clientToken to your front-end
        if(err) {
            res.status(500).json(err);
        } else {
            res.json(response);
        }
      });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.status(500).json(err);
          } else {
              res.json(result);
          }
      });
}