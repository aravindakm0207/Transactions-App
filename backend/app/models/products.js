const mongoose=require('mongoose')
const {Schema,model}=mongoose

const productSchema=new Schema({
    
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:Date

})
const Product=model('Product',productSchema)
module.exports = Product