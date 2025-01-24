const User=require('./User');
const dotenv=require('dotenv');
const crypto = require('crypto');
dotenv.config();
const registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    console.log(name,email,password);
    try{
        const existingUser=await User.findOne({email});
        console.log(existingUser);
        if(existingUser) return res.status(400).json({
            message:'User already exists'
        });
        const newUser=new User({name,email,password});
        console.log(newUser);
        await newUser.save();
        res.status(201).json({message:'User registerd succesfully'});
    }
    catch(err){
        res.status(500).json({message:'Error registred user'});
    }
};

const loginuser=async (req, res) => {
    const { email, password } = req.body;
     console.log(email,password);
     
    try {
        const user = await User.findOne({ email });
        console.log("user ->{}",user);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        console.log("password ->{}",password,user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("ismathc",isMatch);
        
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const forgotuser=async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordUrl = `http://localhost:6000/reset-password/${resetToken}`;

        user.resetToken = resetToken;
        user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        res.status(200).json({ message: `Password reset link sent: ${resetPasswordUrl}` });
    } catch (err) {
        res.status(500).json({ message: 'Error sending reset link' });
    }
};


 const resetuser=async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    try {
        const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};

module.exports={registerUser,loginuser,forgotuser,resetuser};