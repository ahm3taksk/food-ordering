import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
    await dbConnect();

    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    try {
        const newUser = await new User(body)
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.confirmPassword = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        res.status(200).json({ message: "User created successfully" });

    } catch (err) {
        console.error(err);
    }
};

export default handler;