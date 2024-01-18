import express, {json, urlencoded} from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.mjs"


// Constants
const PORT = process.env.PORT || 8001;
const app = express();


// Middlewares
app.use(json());
app.use(urlencoded({extended: false}));


// Routes
app.get('/', function(req, res){
    return res.status(200).json({"message":"sucess!"})
});
app.use('/me', userRouter)

app.listen(PORT || 8001, (err)=>{
    if (err) console.error(error);
    console.log(`Server listening on PORT ${PORT}`)
});