import mongoose from 'mongoose'

const connectDb = async()=>{

    try{
        
        mongoose.connection.on('connected',()=>console.log("connection successfull"));

        await mongoose.connect(`${process.env.MONGODBURI}/DsaTracker`)
    }catch(error){
        console.log(error);
    }
}

export default connectDb