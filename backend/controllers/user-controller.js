import User from "../models/user";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) { 
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({message: "No users found"});
    }

    return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (exisitingUser) {
        return res.status(400).json({message: "User already exists! Login Instead!"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });
    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let exisitingUser;
    try {
        exisitingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (!exisitingUser) {
        return res.status(404).json({message: "User doesn't exist! Please sign up."});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, exisitingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid Password!"});
    }
    return res.status(200).json({ message: "Login Successful" });
};
