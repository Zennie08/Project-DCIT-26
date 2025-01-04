import validator from 'validator'
import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Route for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ message: "User doesn't exist", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            return res.json({ message: 'Invalid Credentials', success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Route for User Registration
const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        //Checking if the User already exist or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({message:"User Already Exists" ,success:false})
        }

        //Validatin Email format and Strong Password
        if(!validator.isEmail(email)){
            return res.json({message:"Please Enter a Valid Emaill" ,succes:false})
        }

        if(password.length < 8){
            return res.json({message:"Please Enter a Strong Password" ,succes:false})
        }

        //Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password ,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken (user._id)

        res.json({message: "Account Successfully Created", success:true, token})


    } catch (error) {
        console.log(error);
        res.json({succes:false, message:error.message})
    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({succes:false, message:error.message})
    }
}


const getAllUser = async (req,res) => {
    try {
        const users = await userModel.find({}, '_id'); 
        res.json({ success: true, users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch users.' });
      }
}

export { loginUser, registerUser, adminLogin, }