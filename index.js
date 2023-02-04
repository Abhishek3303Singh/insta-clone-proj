const express = require("express")
const app = express()
const port = process.env.PORT|| 8081;
const mongoose = require("mongoose")
const UserModel = require("./model/User")
const fileUpload = require('express-fileupload')
const cors = require('cors');
const path = require("path");
// app.use(express.json())
app.use(express.json())
app.use(fileUpload())
app.use(cors())

/////////Database connection////
// const MONGO_URI = process.env.MONGO_URI

///////////.ENV CONNECTION//////
// INSTALL ---> npm i dotenv
require ('dotenv'). config ();
const MONGO_URI = process.env.MONGO_URI;
// const uri = `mongodb+srv://Abhishek:Aksingh3303@cluster0.yvzgdbe.mongodb.net/?retryWrites=true&w=majority`;
const uri = MONGO_URI;
mongoose.set('strictQuery', true);
mongoose.connect(uri, (err) => {
    if (err) {
        console.log("MongoDB connection failed");
    } else {
        console.log("Successfully connected to MongoDB")
    }
})




app.listen(port, () => { console.log(`server is listing on ${port}`) })

app.get("/", async (req, res) => {
    try {
        const data = await UserModel.find();
        console.log(data)
        res.json({
            status: 200,
            data
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})
app.post("/post", async (req, res) => {

    const { userName, location, discription } = req.body;
    const { mediaFile } = req.files
    console.log({ userName, location, discription })
    console.log(mediaFile)
    mediaFile.mv('./imageFile/' + mediaFile.name, async (err) => {
        if (err) {
            res.json({
                message: err
            })
        }
        else {
            try {
                const userModelObj = new UserModel({
                    mediaFile: mediaFile.name,
                    ...{ userName, location, discription },


                })
                const resData = await userModelObj.save()



                res.json({
                    status: 200,
                    resData

                })
            } catch (e) {
                res.json({
                    status: 'Failed',
                    message: e.message
                })
            }

        }
    })




})
app.get('/view', async (req, res) => {
    // console.log("Requested Data")
    try {
        const userPostData = await UserModel.find()
        res.json({
            status: 200,
            userPostData
        })
    }catch (e) {
        res.json({
            status: "Failed",
            message: e.message

        })
    }
})
app.get('/view/:image', async(req, res)=>{
    
    try{
        console.log('request-image')
        // const imgName = await req.params.mediaData
        console.log(`./mediaFolder/${req.params.image}`)
        res.sendFile(path.join(__dirname,`./imageFile/${req.params.image}`))
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })

    }

})