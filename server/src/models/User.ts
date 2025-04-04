import mongoose from "mongoose";
import baseModel from './baseModel'
//Mongoose 里，一切都始于Schema
const userSchema = new mongoose.Schema({
    ... baseModel,
    ername: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true,
    },
    bio: {
        type:String,
        default: null
    },
    image: {
        type:String,
        default: null
    },
});

export default userSchema

