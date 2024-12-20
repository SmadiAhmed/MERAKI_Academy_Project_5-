const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const { 
    createProduct,
    getProductsByTouristSpotsId,
    getAllProducts,
    getProductById,

    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization("Admin"),createProduct);

productRouter.get("/",getAllProducts);

productRouter.get("/:touristSpotsid", getProductsByTouristSpotsId);

productRouter.get("/details/:productId", getProductById);



module.exports = productRouter;
