import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import TodoRouter from "./routes/todo.js"

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://0.0.0.0/Todo", {useNewUrlParser: true})
    .then( console.log("Connected to DB") )
    .catch( (error) => {console.log(error)} );

app.use('/todo', TodoRouter);

app.listen('3000', () => {
    console.log('Server started at port 3000');
})