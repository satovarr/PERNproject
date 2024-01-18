import express, {json, urlencoded} from "express";
import userRouter from "./routes/user.mjs"
import {PORT} from "./config.mjs"

// Constants
const app = express();


// Middlewares
app.use(json());
app.use(urlencoded({extended: false}));



// Routes
app.get('/', function(req, res){
    return res.status(200).json({"message":"sucess!"})
});
app.use('/me', userRouter)


app.use(function errorHandler(err, req, res, next) {
    console.error(err);
    return res.status(500).send({
        error: 'An error occurred, please try again later.'
    });
});

app.listen(PORT || 8001, (err)=>{
    if (err) console.error(error);
    console.log(`Server listening on PORT http://localhost:${PORT}`)
});