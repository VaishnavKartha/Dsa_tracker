import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import { seed } from './seed.js';
import router from './routes/questionRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin : process.env.CLIENT_URI,
    credentials:true
}

))

app.use(express.json())

app.use("/",router)

connectDb()
app.listen(PORT,async()=>{
    console.log(`Server Listening on port ${PORT}`)
    //await seed()
}
)