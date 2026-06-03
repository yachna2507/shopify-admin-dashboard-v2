const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shopifyDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error", err));

//Home route

app.get("/", (req, res) => {
    res.send("Shopify Mini App is running");

});
                                                               
app.get("/sync-products", async (req, res) => {
    try {
        const axios = require("axios");
        const url = `${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`;
        const response = await axios.get(url, {
            headers: {
                "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN
            },

        });
        
        const existingProducts = await Product.findOne({
            shopifyId: product.id,
        });
      if (!existingProduct) {
  
        const newProduct = new
        Product({
                    shopifyId: product.id,
                    title: product.title || "",
                    image: product.image?.src || "",
                    price: product.variants?.[0]?.price || 0,
                    quantity: product.variants?.[0]?.inventory_quantity || 0,
                    status: "Pending",
                });
await newProduct.save();
         console.log("Product Saved");
        } else {
            existingProduct.title = product.title || "";
            existingProduct.image = product.image?.src || "";
            existingProduct.price = product.variants?.[0]?.price || 0;
            existingProduct.quantity = product.variants?.[0]?.inventory_quantity || 0;
            await existingProduct.save();
        }
        
        return res.json({ 
            success: true,
        message: "products synced successfully",
    });
} catch (error) {
            console.log(error);

           res.json({
            success: false,
            message: "Error fetching Shoipify Products ",
            });
         }   
        });
        app.get("/products", async (req, res) => {
            try {
            const products = await
             Product.find();
            
            res.json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
            });
        }
        });
//delete 
        app.delete("/products/:id",
            async (req , res) => {
                try {
                    await Product.findByIdAndDelete(req.params.id);
                    res.json({
                        success: true,
                        message: "Product deleted",
                    });
                } catch (error) {
                    res.json({
                        success: false,
                        message: error.message,
                    });
                }
             });
        //update
        app.put("/products/:id", async (req, res) => {

            try {
                console.log(req.params.id);
                console.log(req.body);
                    const product = await Product.findById(req.params.id);
                    
                    if (!product) {
                        return 
                        res.status(404).json({
                            success: false,
                        });
                        
                    }
                    if (req.body.status !== undefined) {
product.status = req.body.status;
                    }
                    if (req.body.quantity !== undefined) {
                        product.quantity = req.body.quantity;
                    }
                    await product.save();


                console.log(product);
                res.json(product);
            } catch (error) {
                res.status(500).json({
                    success: false,
                });
                
            }
        });

        app.get("/sync-orders", async (req, res) => {
            try {
                 
                
                const response = await axios.get(
                    `${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_API_VERSION}/orders.json`, 
                    {
                        headers: {
                            "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN
                        },
                    }
                );
                console.log(response.data.orders);
                for ( 
                    const item
                    of response.data.orders
                ) {
                    await 
                    Order.findOneAndUpdate(
                        {
                            orderId: item.id
                        },
                        {
                            orderId: item.id,
                            customer:
                            item.customer?.first_name,

                            email: item.email,

                            totalPrice:
                            item.total_price,
                            financialStatus:
                            item.financial_status,
                        },
                        {
                            upsert: true
                        }
                    );
                }
               const orders = await Order.find();
               res.json(orders);
                
            } catch (error) {
                console.log(error);
                res.json({
                    success: false
                });
            }
        });
    app.listen(4000, () => {
    console.log(`Server running on port 4000`);
});
