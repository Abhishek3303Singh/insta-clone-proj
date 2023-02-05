const mongoose = require('mongoose');
// const UserData = require('../../../frontend-backend/backend/model/User');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    mediaFile:{type:String, require:true},
    userName :{type:String, require:true},
    location :{type:String, require:true},
    likes :{type:Number, default:Math.floor(Math.random() * 1001)},
    discription:{type:String, require:true},
    created: {
        type: Date,
        default: Date.now()}

}, {timestamps:true})
const InstaUser = mongoose.model('InstaData', userSchema);
module.exports = InstaUser;