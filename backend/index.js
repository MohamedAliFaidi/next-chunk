const express = require('express');
const doten = require('dotenv');
const cors = require('cors');
const { getAll, newProduct } = require('./controllers/productController');
const app = express();
const port = 4000;
const dbConnect = require("./config/db");
doten.config();

app.use(cors({
    origin: "*"
}))
app.use(express.json());

dbConnect();

app.get("/api/products/getall",getAll);

app.post("/api/products/create",newProduct);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})