

const Order = require("../modules/order.module");
const Product = require("../modules/product.module")


async function OrdersCreate(req, res) {
    let {items} = req.body
    try {

        const codes = items.map(item => item.code);
        console.log(codes);
        const mahsulotlar = await Product.find({
            code: { $in: codes }
        });
        let codesObject = {}
        console.log(mahsulotlar);
        mahsulotlar.map(product => {
            codesObject[product.code] = { price: product.price }
        })

        let cost = 0

        console.log(mahsulotlar);
        for (const item of items) {
            const mahsulot = mahsulotlar.find(m => {
                console.log(m, " =>Code M");
                console.log(item);
                return m.code === item.code

            });
            console.log("mahsulot=>", mahsulot);
            if (mahsulot) {
                mahsulot.massa = mahsulot.massa - item.massa;

                await mahsulot.save();


                cost += item.massa * codesObject[item.code].price
            }
        }


        let createdOrder = await Order.create({ items, cost })

        res.status(200).send({ success: true, order: createdOrder })
    } catch (err) {
        console.error('Xatolik yuz berdi:', err);
    }
} 

module.exports = { OrdersCreate }

