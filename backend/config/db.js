const mongoose=require('mongoose')
const configureDB=async ()=>{
    try{
        const db= await mongoose.connect(`mongodb://127.0.0.1:27017/roxiler`)
        console.log("db connected succesffuly")

    }catch(err){
        console.log(err)
    }
}

module.exports=configureDB