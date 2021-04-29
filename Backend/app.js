require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paymentBRoutes = require("./routes/paymentBRoutes");


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true
}).then(()=> {
    console.log("connected with mongodb");
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes); 
app.use("/api", categoryRoutes); 
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);


app.listen(port, () => {
    console.log("app is running at port no "+port);
});