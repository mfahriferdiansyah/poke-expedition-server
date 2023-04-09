const midtransClient = require('midtrans-client');

class MidtransController {
    static async getToken(req, res, next) {
        try {
            let {email} = req.user
            
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_TOKEN
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `PKMN-`+ Date.now().toString(16) + Math.random().toString(16).slice(15),
                    "gross_amount": 10000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": email,
                }
            };
            
            const midtransToken = await snap.createTransaction(parameter)

            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MidtransController