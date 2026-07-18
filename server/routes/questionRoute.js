import questionModel from "../models/question_schema.js"
import express from 'express'

const router = express.Router();


router.get("/" ,async(req,res)=>{
    try {

        const questions = await questionModel.find();

        if(questions.length > 0){
            return res.status(200).json({success:true,questions:questions})
        }

        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message})
        
    }
})


router.put("/:id",async(req,res)=>{

    const {id} = req.params
    const {isDone} = req.body

    try {

        const question = await questionModel.findByIdAndUpdate(id,{$set:{isDone:isDone}});
        if(!question) return res.status(404).json({success:false,message:"question not found"});

        return res.status(200).json({success:true,message:"updation successfull"})

        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message})
        
    }
})

export default router