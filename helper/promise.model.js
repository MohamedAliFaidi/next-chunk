import mongoose from "mongoose";


const PromiseSchema = new mongoose.Schema({
email:{
    type:String,
    required:true
},
code:{
    type:String,
    required:true
}
});

export default mongoose.models.Prom ||
  mongoose.model("Prom", PromiseSchema);
