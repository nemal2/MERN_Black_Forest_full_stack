import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from"./routes/post.route.js"
import authRoute from"./routes/auth.route.js"
import testRoute from"./routes/test.route.js"
import userRoute from"./routes/user.route.js"
import chatRoute from"./routes/chat.route.js"
import messageRoute from"./routes/message.route.js"
import Stripe from "stripe"; 


const app = express();

//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.post("/api/checkout", async(req,res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items:req.body.items.map(item=>{
                return{
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:item.name
                        },
                        unit_amount:(item_price)*100,
                    },
                    quantity:item.quantity
                }

            }),
            success_url:"${process.env.CLIENT_URL}/success",
            cancel_url:"${process.env.CLIENT_URL}/cancel"
        })

        res.json({url:session.url})
    }catch(error){
        res.status(500).json({error:error.message})
    }
})


app.listen(8800, () => {
    console.log("Server is running!");
});