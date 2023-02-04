const express = require("express");
require('colors');
const cors = require('cors');
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require('./config/config')
const productRoutes = require('./routes/productsRoute');
const { errorHandler } = require('./middlewares/errorMiddlewares');
const usersRoutes = require('./routes/UsersRoute')
const orderRoutes = require('./routes/orderRoute')
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json())

dotenv.config();

connectDb();

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});



app.use('/api', productRoutes);
app.use('/api/users', usersRoutes);
app.use("/api/orders", orderRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})



app.use(errorHandler);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`.inverse);
});
