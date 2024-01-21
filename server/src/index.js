import express, {json, urlencoded} from "express";
// import userRouter from "./routes/user.mjs";
import {PORT} from "./config.mjs";
import { createHandler } from 'graphql-http/lib/use/express';
import graphiql from 'graphql-playground-middleware-express';
import graphql from 'graphql';
const expressPlayground = graphiql.default



import schema from './utils/graphql.mjs';

// Constants
const app = express();
app.get('/playground', expressPlayground({ endpoint: '/api' }))

app.use('/api', createHandler({ schema }))

// Middlewares
app.use(json());
app.use(urlencoded({extended: false}));



// Routes
app.get('/', function(req, res){
    return res.status(200).json({"message":"sucess!"})
});
// app.use('/me', userRouter)


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