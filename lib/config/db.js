import mongoose from "mongoose"

export const ConnectDB = async ()=>{
    await mongoose.connect("mongodb+srv://krushnkumar403:<password>@cluster0.ho4fjvd.mongodb.net/todo")
    console.log("DB connected")
}