import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from "swagger-ui-express";
import axios from "axios";
import cookieParser from "cookie-parser";
import { errorMiddleware } from '../../../packages/error-handler/error-middleware';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.use(cors({
    origin:["http://localhost:3000"],allowedHeaders:['Authorization','Content-Type'],credentials:true
  }),)
  app.use(cookieParser());
app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API'});
});

app.use(errorMiddleware)

const server= app.listen(port, host, () => {
    console.log(`Auth service is running at  http://${host}:${port}/api`);
});


server.on("error",(err)=>{
    console.log("Server Error:",err);
})