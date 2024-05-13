const express = require("express");
const { OrdersCreate } = require("../controllers/order.controller");
const OrderRouter = express.Router();

OrderRouter.post("/create", OrdersCreate);

module.exports = OrderRouter;
