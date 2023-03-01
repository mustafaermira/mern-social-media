import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url' //set the paths when you configure directories later on
// import {register} from './controllers/auth.js'
/*CONFIGURATIONS - middleware configs - runs in between different requests*/

const __filename = fileURLToPath(import.meta.url) //grab the file url -- when you use the modules
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express() 
app.use(express.json)
app.use(helmet)
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/*FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //anytime someone uploads a file its gonna save in this destination
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage}); //will help us save it 
//we're gonna use this variable anytime we want to upload a file

/*ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);



//now we setup mongodb
//duhet me ndre Ip adreseen-- perndryshe nuk bon mu lidh
/* MONGOOSE SETUP */
const PORT  = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect ${process.env.PORT}`));