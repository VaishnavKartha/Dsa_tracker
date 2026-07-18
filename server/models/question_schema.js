import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    question_name : {type:String,required:true},
    difficulty : {type:String,enum:["Easy","Medium","Hard"],required:true},
    topic:{type:String, required:true},
    isDone:{type:Boolean,default:false,required:true}
},{timestamps:true})

const questionModel = mongoose.model("Questions",QuestionSchema)

export default questionModel