const express = require("express");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/orderController");
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();

//create new order
router.route("/").post(protect, addOrderItem);
//get order by id
router.route("/:id").get(protect, getOrderById);
//update order
router.route("/:id/pay").put(protect, updateOrderToPaid);



module.exports = router;
