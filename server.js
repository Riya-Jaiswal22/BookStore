const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./books/bookRoutes');  // Adjust the path as needed
const userRoutes=require('./user/userRoutes')
const dotenv = require('dotenv');
const cors=require('cors')

dotenv.config();  // Load environment variables from .env file
const app = express();
const corsOption={
    origin:"http://localhost:3000/",
    methods:'GET,POST,PUT',
    allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOption))

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({extended:true}))

app.use('/book', bookRoutes);
app.use('/user',userRoutes);

const start = async () => {
    try {
        // console.log('MongoDB URI:', process.env.MONGO_URI);  // Add this line to check the value
        await mongoose.connect("mongodb+srv://mongo:mongo123@cluster0.tg2evye.mongodb.net/Book_app", {
  
        });
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

start();
