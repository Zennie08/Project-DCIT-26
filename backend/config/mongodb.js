import mongoose, { mongo } from "mongoose"

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('DB Connected');
        
    })

    await mongoose.connect(`${process.env.MONGO_URI}/pos`)

}

export default connectDB    